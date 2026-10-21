import { offers } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { CopyCode } from '../../components/ui/CopyCode'

/** The close: the coupon codes. */
export function Closing() {
  const ref = useReveal()
  return (
    <section ref={ref} className="pt-20 lg:pt-28" aria-labelledby="notes-title">
      <div className="shell">
        <h2 id="notes-title" className="display text-[24px] sm:text-[32px]">
          Codes <span className="hand">for you</span>
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {offers.map((o) => (
            <li key={o.code} className="flex items-center justify-between gap-3 rounded-[14px] border border-dashed border-line-strong bg-paper px-5 py-4">
              <p className="text-[14px] text-ink">{o.title}</p>
              <CopyCode code={o.code} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
