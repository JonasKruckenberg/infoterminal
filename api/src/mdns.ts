import Mdns from 'multicast-dns'
import { EventEmitter } from 'events'
import os from 'os'

const TLD = '.local'

const ServiceRegistry = new Map<string, DNSRecords>()
const mdns = Mdns()

interface ServiceOptions {
  name: string
  host?: string
  port: number
  type: string
  subtypes?: string[]
  protocol?: 'tcp' | 'udp'
  txt?: Record<string, any>
}

type DNSRecords = ReturnType<Service['_records']>

export default class Service extends EventEmitter {
  name: string
  protocol: 'tcp' | 'udp' = 'tcp'
  type: string
  host: string = os.hostname()
  port: number
  subtypes: string[]
  txt: Record<string, any> = null
  published: boolean = false
  fqdn: string

  constructor(opts: ServiceOptions) {
    super()
    this.name = opts.name
    this.port = opts.port
    this.type = opts.type
    if (opts.host) this.host = opts.host
    if (opts.subtypes) this.subtypes = opts.subtypes
    if (opts.protocol) this.protocol = opts.protocol
    if (opts.txt) this.txt = opts.txt
    this.fqdn = `${this.name}.${this.type}${TLD}`
    register(this._records())
  }

  _records() {
    const records = [this.rrPtr, this.rrSrv, this.rrTxt]

    for (const [_, iface] of Object.entries(os.networkInterfaces())) {
      iface.forEach(addr => {
        if (addr.internal) return
        if (addr.family === 'IPv4') {
          records.push(this.rrA(addr.address))
        } else {
          records.push(this.rrAaaa(addr.address))
        }
      })
    }
    return records
  }

  get rrPtr() {
    return {
      name: this.type + TLD,
      type: 'PTR',
      ttl: 28800,
      data: this.fqdn
    }
  }

  get rrSrv() {
    return {
      name: this.fqdn,
      type: 'SRV',
      ttl: 120,
      data: {
        port: this.port,
        target: this.host
      }
    }
  }

  get rrTxt() {
    return {
      name: this.fqdn,
      type: 'TXT',
      ttl: 4500,
      data: txtEncode(this.txt)
    }
  }

  rrA(ip: string) {
    return {
      name: this.host,
      type: 'A',
      ttl: 120,
      data: ip
    }
  }

  rrAaaa(ip: string) {
    return {
      name: this.host,
      type: 'AAAA',
      ttl: 120,
      data: ip
    }
  }
}

function txtEncode(obj: Record<string, any>) {
  if (!obj) return
  const encoder = new TextEncoder()
  let out = new Uint8Array()
  for (const entry of Object.entries(obj)) {
    let buf: Uint8Array
    if (typeof entry[1] === 'boolean') {
      buf = encoder.encode(entry[0])
    } else {
      buf = encoder.encode(`${entry[0]}=${entry[1]}`)
    }
    const size = buf.byteLength
    if (size > 255) throw new Error(`Entry ${entry[1]} is too large`)
    out = new Uint8Array(out.length + size + 1)
    out.set(out)
    out.set([size])
    out.set(buf)
  }
  return out
}

mdns.on('query', ({ questions }) => {
  for (const question of questions) {
    const answers =
      question.type === 'ANY'
        ? Array.from(ServiceRegistry.keys()).flatMap(type => _recordsFor(question.name, type))
        : _recordsFor(question.name, question.type)

    if (answers.length === 0) return

    let additionals = []
    if (question.type !== 'ANY') {
      answers.forEach(answer => {
        if (answer.type !== 'PTR') return
        additionals = additionals
          .concat(_recordsFor(answer.data as string, 'SRV'))
          .concat(_recordsFor(answer.data as string, 'TXT'))
      })

      // to populate the A and AAAA records, we need to get a set of unique
      // targets from the SRV record
      additionals
        .filter(record => record.type === 'SRV')
        .map(record => record.data.target)
        .forEach(target => {
          additionals = additionals
            .concat(_recordsFor(target, 'A'))
            .concat(_recordsFor(target, 'AAAA'))
        })
    }
    mdns.respond({ answers, additionals }, console.log)
  }
})

function _recordsFor(_name: string, type: string) {
  if (!ServiceRegistry.has(type)) return []

  return ServiceRegistry.get(type).filter(({ name }) => {
    const n = ~_name.indexOf('.') ? name : name.split('.')[0]
    return n.toLowerCase() === _name.toLowerCase()
  })
}

function register(records: DNSRecords) {
  for (const record of records) {
    if (ServiceRegistry.has(record.type)) {
      const e = ServiceRegistry.get(record.type)
      e.push(record)
      ServiceRegistry.set(record.type, e)
    } else {
      ServiceRegistry.set(record.type, [record])
    }
  }
}
