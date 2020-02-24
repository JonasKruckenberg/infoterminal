import { readFile } from 'fs-extra'
import { resolve } from 'path'

enum TreeElementTypes {
  MEDIA = 'media',
  CATEGORY = 'category',
  EMPTY = 'empty'
}
interface TreeElement {
  type: TreeElementTypes,
  name: string,
  description: string,
  buffer?: ArrayBuffer,
  url?: string,
  //thumbnail?: ArrayBuffer,
  //media?: ArrayBuffer|string,
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

export default async function resolveTree(root: string,elements:Array<MediaDescriptor>): Promise<Array<TreeElement>> {
  const resolvedElements:Array<Promise<TreeElement>> = elements.map(async (el:MediaDescriptor) => {
    const out:TreeElement = {
      type: null,
      name: el.name,
      description: el.beschreibung,
      coordinates: el.koordinaten
    }
    if ( el.vorschaubild ) {
      const buf = await readFile(resolve(root, el.vorschaubild))
      out.buffer = buf.buffer
    }
    if ( el.media ) {
      // if `media` exists the entry has to be a media entry
      out.type = TreeElementTypes.MEDIA

      if ( el.media.startsWith('https://') ) {
        out.url = el.media
      } else {

        try {
          // resolve and load the Image/Video
          const buf = await readFile(resolve(root, el.media))
          out.buffer = buf.buffer
          // also resolve and load the thumbnail if one was specified
        } catch (err) {
          // something went wrong, propably while resolving. So log it here
          console.warn('Error while compiling Tree ', err)
        }
        
      }

    } else if ( el.elemente ) {
      // if `elemente` exists it has to be a category entry
      out.type = TreeElementTypes.CATEGORY

      try {
        // resolve children elements, recursively
        out.elements = await resolveTree(root,el.elemente)
      } catch (err) {
        // something went wrong, propably while resolving. So log it here
        console.warn('Error while compiling Tree ', err)
      }

    } else {
      // nothing checkable existed. It is empty an empty entry
      // TODO: Check if is a valid entry at all
      out.type = TreeElementTypes.EMPTY
    }
    return out
  })
  return await Promise.all(resolvedElements)
}
