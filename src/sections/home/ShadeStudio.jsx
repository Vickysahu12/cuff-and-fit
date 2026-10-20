import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import { shadeStudio } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { useCart } from '../../features/cart/CartContext'
import { useToast } from '../../features/toast/Toast'
import { imageSet } from '../../data/media'
import { flyToCart } from '../../lib/flyToCart'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

/**
 * Shade studio: the signature shirt in every colour, laid out as one spectrum. Drag along it
 * (or tap a colour, or use the arrow keys) and the photo changes shirt as you go. All twelve
 * photos are stacked and preloaded, so scrubbing is instant. Size and "Add to bag" act on
 * the colour you land on.
 */
export function ShadeStudio() {
  const reduce = useReducedMotion()
  const shirts = useMemo(() => shadeStudio.ids.map(getProductSync), [])
  const [index, setIndex] = useState(6)
  const [size, setSize] = useState(null)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const bar = useRef(null)
  const photo = useRef(null)
  const chips = useRef([])
  const { add, setOpen } = useCart()
  const { show } = useToast()
  const shirt = shirts[index]

  const pick = (i) => {
    setIndex(i)
    setError('')
  }
  const fromPointer = (e) => {
    const r = bar.current.getBoundingClientRect()
    const i = Math.min(shirts.length - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * shirts.length)))
    if (i !== index) pick(i)
  }
  const onKey = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    const next = (index + step + shirts.length) % shirts.length
    pick(next)
    chips.current[next]?.focus()
  }

  const addToBag = () => {
    if (!size) return setError('Pick a size first.')
    add(shirt.id, size)
    flyToCart(photo.current, imageSet(shirt.images[0]).srcSm)
    show({ title: 'Added to bag', body: `${shirt.name}, size ${size}`, image: shirt.images[0], action: { label: 'View bag', onClick: () => setOpen(true) } })
  }

  return (
    <section id="shades" className="shell scroll-mt-28 pt-20 lg:pt-28" aria-labelledby="shades-title">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-16">
        {/* The photo: all colours stacked, the current one on top */}
        <div ref={photo} className="relative mx-auto aspect-[3/4] w-full max-w-[440px] overflow-hidden rounded-[18px]" style={{ backgroundColor: imageSet(shirt.images[0]).tone }}>
          {shirts.map((s, i) => (
            <Img
              key={s.id}
              id={s.images[0]}
              alt={i === index ? `${s.name}, worn` : ''}
              priority={i === index}
              className={cn('absolute! inset-0 transition-opacity ease-out', dragging ? 'duration-100' : 'duration-300', i === index ? 'opacity-100' : 'opacity-0')}
              position="50% 20%"
            />
          ))}
          <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-paper/95 py-1.5 pr-3 pl-1.5 text-[12px] text-ink shadow-float backdrop-blur-sm">
            <span className="size-5 rounded-full ring-1 ring-line-strong" style={{ backgroundColor: shirt.hex }} />
            {shirt.color}
          </span>
          <span className="caps absolute right-4 bottom-4 rounded-full bg-ink/80 px-3 py-1.5 text-[9.5px] text-cream tabular-nums backdrop-blur-sm">
            {String(index + 1).padStart(2, '0')} / {shirts.length}
          </span>
        </div>

        <div>
          <p className="caps text-[10px] text-gold-deep">Shade studio</p>
          <h2 id="shades-title" className="display mt-3 text-[34px] sm:text-[48px] lg:text-[56px]">
            Every shade, <span className="hand">one fit</span>
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft">{shadeStudio.body}</p>

          {/* The spectrum */}
          <div className="mt-8">
            <div
              ref={bar}
              role="radiogroup"
              aria-label="Shirt colour"
              className="relative flex h-16 cursor-ew-resize touch-none gap-1 select-none"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId)
                setDragging(true)
                fromPointer(e)
              }}
              onPointerMove={(e) => dragging && fromPointer(e)}
              onPointerUp={() => setDragging(false)}
              onPointerCancel={() => setDragging(false)}
            >
              {shirts.map((s, i) => (
                <button
                  key={s.id}
                  ref={(el) => (chips.current[i] = el)}
                  type="button"
                  role="radio"
                  aria-checked={i === index}
                  aria-label={s.color}
                  tabIndex={i === index ? 0 : -1}
                  onKeyDown={onKey}
                  onClick={() => pick(i)}
                  className={cn(
                    'relative flex-1 rounded-[8px] ring-1 ring-black/5 transition-[transform,flex-grow] duration-300 ease-[var(--ease-out)] ring-inset',
                    i === index ? 'grow-[2.2] -translate-y-1.5' : 'hover:-translate-y-0.5',
                  )}
                  style={{ backgroundColor: s.hex }}
                >
                  {i === index && (
                    <motion.span
                      layoutId="shade-marker"
                      className="absolute -top-3 left-1/2 size-2 -translate-x-1/2 rounded-full bg-ink"
                      transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.35, bounce: 0.2 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-2 text-[12px] text-ink-soft">
              <Icon name="caret-left" size={12} weight="bold" />
              Drag along the colours
              <Icon name="caret-right" size={12} weight="bold" />
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6">
            <div>
              <h3 className="text-[19px] font-semibold text-ink">
                <Link to={`/product/${shirt.slug}`} className="link-line">
                  {shirt.name}
                </Link>
              </h3>
              <p className="mt-1 text-[14px] text-ink-soft">
                <span className="font-semibold text-ink tabular-nums">{formatPrice(shirt.price)}</span>
                {shirt.compareAt && <span className="ml-2 line-through tabular-nums">{formatPrice(shirt.compareAt)}</span>} · {shirt.fabric}
              </p>
            </div>
            <div className="flex gap-1.5" role="group" aria-label="Size">
              {shirt.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => {
                    setSize(s)
                    setError('')
                  }}
                  className={cn('press grid size-11 place-items-center rounded-full border text-[13px] font-semibold transition-colors duration-200', size === s ? 'border-ink bg-ink text-cream' : 'border-line-strong text-ink hover:border-ink')}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <p role="alert" className="mt-2 min-h-5 text-[13px] text-danger">
            {error}
          </p>
          <div className="mt-1 flex flex-wrap gap-3">
            <Button onClick={addToBag} arrow>
              Add to bag
            </Button>
            <Button to={`/product/${shirt.slug}`} variant="outline">
              View details
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
