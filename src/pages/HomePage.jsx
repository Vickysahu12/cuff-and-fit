import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { womensEdit } from '../data/content'
import { HeroGroup } from '../sections/home/HeroGroup'
import { Collections } from '../sections/home/Collections'
import { Aside } from '../sections/home/Aside'
import { Marquee } from '../sections/home/Marquee'
import { ShadeStudio } from '../sections/home/ShadeStudio'
import { Carousel } from '../sections/home/Carousel'
import { Closing } from '../sections/home/Closing'

// The inspo's frame: a main column (hero, collections, best sellers) beside a column of
// cards; then the strip of type and the full-width sections.
export function HomePage() {
  useDocumentTitle()
  return (
    <>
      <div className="shell grid gap-x-6 gap-y-12 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <HeroGroup />
          <Collections />
        </div>
        <Aside />
      </div>
      <Marquee />
      <ShadeStudio />
      <Carousel id="women-title" {...womensEdit} />
      <Closing />
    </>
  )
}
