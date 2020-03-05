import * as drivelist from 'drivelist'
import { join } from 'path'
import { pathExists } from 'fs-extra'

export default async () => {
  const validDrives = []
  const drives = await drivelist.list()
  for ( const drive of drives ) {
    console.log(drive)
    if ( drive.isRemovable ) {
      for ( const mount of drive.mountpoints ) {
        const path = join(mount.path, 'nabu-infoterminal', 'package.json')
        if (await pathExists(path)) validDrives.push(path)
      }
    }
  }
  return validDrives
}
