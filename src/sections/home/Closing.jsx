import { offers, instagram } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { CopyCode } from '../../components/ui/CopyCode'

/** The close: the coupon codes and the #StyleThatFitsYou wall. */
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

        <div className="mt-20 flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-[24px] break-all sm:text-[34px] lg:text-[44px]">{instagram.tag}</h2>
          <p className="text-[14.5px] text-ink-soft">Tag {instagram.handle} in your fit of the day.</p>
        </div>
      </div>
      <ul className="shell mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
        {instagram.images.map((id, i) => (
          <li key={id}>
            <a href={instagram.href} target="_blank" rel="noreferrer" aria-label={`Instagram post ${i + 1}`} className="group relative block overflow-hidden rounded-[14px]" data-reveal-frame style={{ '--reveal-delay': `${i * 60}ms` }}>
              <Img id={id} alt="" sizes="(min-width: 1024px) 17vw, 33vw" className="aspect-square" position="50% 25%" imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/55">
                <Icon name="instagram" size={28} className="scale-75 text-cream opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out)] group-hover:scale-100 group-hover:opacity-100" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
