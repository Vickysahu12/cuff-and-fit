import { Link } from 'react-router'
import { Icon } from '../../components/ui/Icon'

/** Section heading in the inspo's manner: heavy caps, a small count, "View" on the right. */
export function Head({ id, title, count, to, cta = 'View all', light }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <h2 id={id} className={`display text-[24px] sm:text-[32px] lg:text-[40px] ${light ? 'text-cream' : ''}`}>
        {title}
        {count != null && <span className="count">({count})</span>}
      </h2>
      {to && (
        <Link to={to} className={`caps view-link group mb-1.5 shrink-0 text-[10.5px] ${light ? 'text-cream' : 'text-ink'}`}>
          {cta} <span className="tail" aria-hidden="true" />
          <Icon name="arrow" size={14} className="-ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
