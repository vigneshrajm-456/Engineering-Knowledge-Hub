import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
export const client = createClient({
  projectId: '1loueg6j',
  dataset: 'production',
  apiVersion: '2026-06-03',
  useCdn: false,
  
})
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
