import { readFile } from 'fs-extra'
import { resolve } from 'path'
import FileType from 'file-type'

enum TreeElementTypes {
  MEDIA = 'media',
  CATEGORY = 'category',
  EMPTY = 'empty'
}
interface TreeElement {
  id: string,
  type: TreeElementTypes,
  name: string,
  description: string,
  preview?: string,
  previewMime?: string,
  media?: string,
  mediaMime?: string,
  coordinates?: [ number, number ],
  elements?: Array<TreeElement>
}
interface MediaDescriptor {
  id: string,
  name: string,
  beschreibung: string,
  vorschaubild?: string,
  media?: string,
  koordinaten?: [ number, number ],
  elemente?: Array<MediaDescriptor>
}


export default async function resolveTree(root: string,elements:Array<MediaDescriptor>,parent:MediaDescriptor): Promise<Array<TreeElement>> {
  const resolvedElements:Array<Promise<TreeElement>> = elements.map(async (el:MediaDescriptor) => {
    const out:TreeElement = {
      id: Math.floor(Math.random() * 10000).toString(),
      type: null,
      name: el.name,
      description: el.beschreibung,
      coordinates: Array.isArray(el.koordinaten) ? el.koordinaten : parent.koordinaten
    }
    if ( el.vorschaubild ) {
      if ( el.vorschaubild.startsWith('https://') ) {
        out.preview = el.vorschaubild
      } else {
        try {
          const buf = await readFile(resolve(root, el.vorschaubild))
          const mimeType = await FileType.fromBuffer(buf)
          const b = new Blob([buf.buffer], {
            type: mimeType.mime
          })
          out.preview =  URL.createObjectURL(b)
          out.previewMime = mimeType.mime

        } catch ( err ) {
          console.error(err)
        }
      }
    }
    if ( el.media ) {
      if ( el.media.startsWith('https://') ) {
        out.media = el.media
      } else {
        try {
          out.type = TreeElementTypes.MEDIA

          const buf = await readFile(resolve(root, el.media))
          const mimeType = await FileType.fromBuffer(buf)
          const b = new Blob([buf.buffer], {
            type: mimeType.mime
          })
          out.media =  URL.createObjectURL(b)
          out.mediaMime = mimeType.mime

        } catch ( err ) {
          console.error(err)
        }
      }
    } else if ( el.elemente ) {
      try {
        out.type = TreeElementTypes.CATEGORY
        out.elements = await resolveTree(root,el.elemente,el)
      } catch ( err ) {
        console.error(err)
      }
    } else {
      out.type = TreeElementTypes.EMPTY
    }
    return out
  })
  return await Promise.all(resolvedElements)
}
