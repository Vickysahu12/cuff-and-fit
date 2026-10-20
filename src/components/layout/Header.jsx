import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { genderPills, quickChips } from '../../config/navigation'
import { useCart } from '../../features/cart/CartContext'
import { useWishlist } from '../../features/wishlist/WishlistContext'
import { useSearch } from '../../features/search/SearchOverlay'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { MegaNav, useIsActive } from './MegaNav'
import { cn } from '../../lib/cn'

/** A round icon button, as in the inspo, with a count that re-pops on change. */
function Round({ icon, label, count, bumpKey, onClick, to, className, ...props }) {
  const Tag = to ? Link : 'button'
  return (
    <Tag
      {...(to ? { to } : { type: 'button', onClick })}
      aria-label={count ? `${label}, ${count} items` : label}
      className={cn(
        'group press relative grid size-10 place-items-center rounded-full border border-line-strong bg-paper text-ink transition-[border-color,background-color,color] duration-200 hover:border-ink hover:bg-ink hover:text-cream sm:size-11',
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={19} className="transition-transform duration-300 ease-[var(--ease-spring)] group-hover:-translate-y-px" />
      {count > 0 && (
        <span
          key={bumpKey}
          className={cn(
            'absolute -top-1 -right-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink tabular-nums ring-2 ring-bone',
            bumpKey ? 'anim-bump' : '',
          )}
        >
          {count}
        </span>
      )}
    </Tag>
  )
}

/**
 * Header in the inspo's two rows: a round menu button, the logo centred and round account /
 * bag buttons; then dropdown pills, a search field and the Men / Women pills. It frosts
 * once the page scrolls and the logo tightens.
 */
export function Header() {
  const cart = useCart()
  const wishlist = useWishlist()
  const { openSearch } = useSearch()
  const isActive = useIsActive()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sentinel = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    if (sentinel.current) io.observe(sentinel.current)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-px" />
      <header
        className={cn(
          'sticky top-0 z-40 transition-[background-color,box-shadow] duration-300',
          scrolled ? 'bg-bone/85 shadow-[0_14px_34px_-24px_rgb(60_44_20/0.45)] backdrop-blur-xl' : 'bg-bone',
        )}
      >
        <div className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-[76px]">
          <div className="flex items-center gap-2">
            <Round icon="menu" label="Open menu" onClick={() => setMenuOpen(true)} />
            <Round icon="search" label="Search" onClick={openSearch} className="lg:hidden" />
          </div>

          <Logo size={scrolled ? 'sm' : 'md'} />

          <div className="flex items-center justify-end gap-2">
            <Round icon="user" label="Profile" to="/account" className="hidden sm:grid" />
            <Round icon="heart" label="Wishlist" to="/wishlist" count={wishlist.count} className="hidden sm:grid" />
            <Round icon="bag" label="Bag" count={cart.count} bumpKey={cart.addedAt} onClick={() => cart.setOpen(true)} data-bag-target="" />
          </div>
        </div>

        {/* Desktop: dropdown pills, search, Men / Women */}
        <div className="shell hidden lg:block">
          <div className="flex items-center justify-between gap-6 border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <MegaNav />
              <button
                type="button"
                onClick={openSearch}
                className="press group flex h-10 w-[260px] items-center justify-between rounded-full border border-line-strong bg-paper pr-3.5 pl-4 text-left text-[13px] text-ink-soft transition-colors duration-200 hover:border-ink"
              >
                Search shirts, co-ords, dresses
                <Icon name="search" size={16} className="text-ink transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>
            <nav aria-label="Shop for">
              <ul className="flex items-center gap-1.5">
                {genderPills.map((p) => {
                  const active = isActive(p.to)
                  return (
                    <li key={p.label}>
                      <Link
                        to={p.to}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'caps press flex h-9 items-center rounded-full border px-4 text-[10px] transition-colors duration-200',
                          active ? 'border-ink bg-ink text-cream' : p.accent ? 'border-sale/40 text-sale hover:border-sale' : 'border-line-strong text-ink hover:border-ink',
                        )}
                      >
                        {p.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* Phones: swipeable chips */}
        <nav aria-label="Categories" className="lg:hidden">
          <ul className="no-scrollbar flex snap-x scroll-px-4 gap-2 overflow-x-auto border-b border-line px-4 pb-3 sm:px-6">
            {quickChips.map((c) => {
              const active = isActive(c.to)
              return (
                <li key={c.label} className="shrink-0 snap-start">
                  <Link
                    to={c.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'caps press flex h-9 items-center rounded-full border px-4 text-[10px] transition-colors duration-200',
                      active ? 'border-ink bg-ink text-cream' : c.accent ? 'border-sale/40 text-sale' : 'border-line-strong text-ink',
                    )}
                  >
                    {c.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
