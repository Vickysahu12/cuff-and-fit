import { marquee } from '../../data/content'

/** The strip of type (ref: "THE BEST HOODIES CLOTHING 2024"), with the gold ampersand between phrases. Pauses on hover. */
export function Marquee() {
  const run = [...marquee, ...marquee]
  return (
    <div className="mt-16 overflow-hidden border-y border-line bg-paper py-4 lg:mt-20" aria-label={marquee.join('. ')}>
      <ul className="marquee items-center" aria-hidden="true">
        {[...run, ...run].map((t, i) => (
          <li key={i} className="flex shrink-0 items-center">
            <span className="display px-6 text-[22px] whitespace-nowrap sm:text-[28px]">{t}</span>
            <span className="amp h-7 text-gold sm:h-8" />
          </li>
        ))}
      </ul>
    </div>
  )
}
