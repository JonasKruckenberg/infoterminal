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
          const path = resolve(root, el.vorschaubild)
          out.preview = 'file:///' + path.replace(/\\/g,'/')
          const { mime } = await FileType.fromFile(path)
          out.previewMime = mime
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

          const path = resolve(root, el.media)
          out.media = 'file:///' + path.replace(/\\/g,'/')
          const { mime } = await FileType.fromFile(path)
          out.mediaMime = mime

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
