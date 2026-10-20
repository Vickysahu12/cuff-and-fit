import { Link } from 'react-router'
import { categories, bestSellers } from '../../data/content'
import { products } from '../../data/products'
import { getProductSync } from '../../services/catalog'
import { useReveal } from '../../hooks/useReveal'
import { ProductCard } from '../../features/product/ProductCard'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'

const count = (id) => products.filter((p) => p.category === id).length

/** A small heading row in the inspo's manner: caps title left, "View all" with an arrow right. */
function Row({ id, title, to }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 id={id} className="display text-[20px] sm:text-[24px]">
        {title}
      </h2>
      <Link to={to} className="caps group flex items-center gap-2 text-[10px] text-ink-soft transition-colors hover:text-ink">
        View all
        <span className="relative h-px w-6 bg-current transition-[width] duration-300 ease-[var(--ease-out)] group-hover:w-9">
          <Icon name="caret-right" size={11} weight="bold" className="absolute -top-[5.5px] -right-1" />
        </span>
      </Link>
    </div>
  )
}

/**
 * "Shop by collection" (four photos, each with a white label card that rises on hover)
 * and "Best sellers" (four product cards), as in the inspo's main column.
 */
export function Collections() {
  const ref = useReveal()
  const best = bestSellers.ids.map(getProductSync)
  const shown = categories.slice(0, 4)

  return (
    <div ref={ref}>
      <section className="pt-14 lg:pt-16" aria-labelledby="collections-title">
        <Row id="collections-title" title="Shop by collection" to="/shop" />
        <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {shown.map((c, i) => (
            <li key={c.id}>
              <Link to={c.to} className="group relative block overflow-hidden rounded-[14px] bg-sand" data-reveal-frame style={{ '--reveal-delay': `${i * 70}ms` }}>
                <Img id={c.image} alt={`${c.label} for ${c.for.toLowerCase()}`} className="aspect-[4/5]" position="50% 18%" imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.05]" />
                <span className="absolute inset-x-2.5 bottom-2.5 rounded-[10px] bg-paper/95 px-3.5 py-3 backdrop-blur-sm transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="caps text-[10.5px] text-ink">{c.label}</span>
                    <span className="text-[11px] text-ink-soft tabular-nums">{count(c.id)}</span>
                  </span>
                  <span className="caps mt-2 flex items-center gap-2 text-[9px] text-ink-soft group-hover:text-ink">
                    Shop {c.for.toLowerCase()}
                    <span className="relative h-px flex-1 bg-current">
                      <Icon name="caret-right" size={10} weight="bold" className="absolute -top-[5px] -right-1 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-12 lg:pt-14" aria-labelledby="best-title">
        <Row id="best-title" title={bestSellers.title} to={bestSellers.to} />
        <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4">
          {best.map((p, i) => (
            <li key={p.id} data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
