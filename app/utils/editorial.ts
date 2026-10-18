// Component names as strings would only resolve in dev — production builds
// require an entry in @nuxt/content's manifest, which string maps don't get.
// Passing the resolved components keeps SSR identical in dev and prod.
import {
  ProseImage,
  SProseH1, SProseH2, SProseH3,
  SProseH4, SProseH5, SProseH6, SProsePre,
} from '#components'

export const proseComponents = {
  h1: SProseH1, h2: SProseH2, h3: SProseH3,
  h4: SProseH4, h5: SProseH5, h6: SProseH6, pre: SProsePre,
  img: ProseImage,
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(date))
}
