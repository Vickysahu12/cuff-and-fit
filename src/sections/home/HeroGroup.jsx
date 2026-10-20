import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { heroSets, cutout, socials } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { formatPrice } from '../../lib/format'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

const AUTO = 7000
const WORD_A = ['C', 'U', 'F', 'F']
const WORD_B = ['F', 'I', 'T']

// Placement of the three figures: the outer two stand tall, the middle one a step lower.
const SLOTS = [
  { left: '4%', height: '118%', z: 2 },
  { left: '34%', height: '104%', z: 3 },
  { left: '61%', height: '118%', z: 1 },
]

/** One figure: a cut-out photo whose head rises over the brand name. Hover shows the piece. */
function Person({ person, slot, index, dir, active, onHover }) {
  const reduce = useReducedMotion()
  const product = getProductSync(person.productId)
  const dim = active != null && active !== index
  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left: slot.left, height: slot.height, zIndex: active === index ? 5 : slot.z }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 90 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.75, delay: 0.08 * index, ease: [0.23, 1, 0.32, 1] } }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -90, transition: { duration: 0.4, delay: 0.05 * index, ease: [0.77, 0, 0.175, 1] } }}
    >
      <Link
        to={`/product/${product.slug}`}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(index)}
        onBlur={() => onHover(null)}
        className="group relative block h-full"
        aria-label={`${product.name}, ${formatPrice(product.price)}`}
      >
        <img
          src={cutout(person.cut)}
          alt=""
          width={600}
          height={900}
          draggable={false}
          fetchPriority={index === 1 ? 'high' : undefined}
          className={cn(
            'h-full w-auto max-w-none origin-bottom object-contain drop-shadow-[0_24px_30px_rgb(60_44_20/0.18)] transition-[opacity,filter,scale] duration-500 ease-[var(--ease-out)]',
            dim && 'opacity-60 saturate-50',
            active === index && 'scale-[1.025]',
          )}
        />
        {/* The piece he or she is wearing: always on touch, on hover with a pointer */}
        <span
          className={cn(
            'absolute top-[46%] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-paper/95 py-1.5 pr-1.5 pl-3 text-[12px] whitespace-nowrap text-ink shadow-float backdrop-blur-sm transition-[opacity,translate] duration-300 ease-[var(--ease-out)]',
            'max-lg:hidden',
            active === index ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
          )}
        >
          <span className="font-semibold">{product.name}</span>
          <span className="text-ink-soft tabular-nums">{formatPrice(product.price)}</span>
          <span className="grid size-6 place-items-center rounded-full bg-gold text-ink">
            <Icon name="arrow" size={12} weight="bold" />
          </span>
        </span>
      </Link>
    </motion.div>
  )
}

/**
 * Hero in the inspo's manner: the brand name set enormous, and a group of three standing in
 * front of a sand panel, their heads rising over the letters. "Swipe" (or a drag across the
 * panel) sends the group off to the left and brings the next one in; it also turns on a
 * timer until the visitor takes over. Hovering a figure dims the others and names the piece.
 */
export function HeroGroup() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [touched, setTouched] = useState(false)
  const [active, setActive] = useState(null)
  const set = heroSets[index]

  const go = (step, byUser = true) => {
    setDir(step)
    setIndex((i) => (i + step + heroSets.length) % heroSets.length)
    if (byUser) setTouched(true)
  }

  useEffect(() => {
    if (touched || reduce || active != null) return
    const t = setTimeout(() => go(1, false), AUTO)
    return () => clearTimeout(t)
  }, [index, touched, reduce, active])

  return (
    <section aria-labelledby="hero-title" className="pt-6 lg:pt-8">
      <p className="caps text-right text-[10.5px] text-ink sm:text-[12px]">The best shirts are only here</p>

      <h1 id="hero-title" className="relative mt-2 flex items-center justify-center text-[clamp(64px,16.5vw,184px)] leading-[0.82] font-extrabold tracking-[-0.03em] text-ink uppercase select-none sm:justify-between" style={{ fontFamily: 'var(--font-display)' }}>
        <span className="sr-only">Cuff &amp; Fit: style that fits you</span>
        <span aria-hidden="true" className="flex">
          {WORD_A.map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden pt-[0.04em]">
              <span className="hero-letter inline-block" style={{ '--i': i }}>
                {ch}
              </span>
            </span>
          ))}
        </span>
        <motion.span
          aria-hidden="true"
          className="amp mx-[0.04em] h-[0.92em] text-gold"
          initial={reduce ? false : { rotate: -24, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 1.1, bounce: 0.35, delay: 0.45 }}
          whileHover={reduce ? undefined : { rotate: -10 }}
        />
        <span aria-hidden="true" className="flex">
          {WORD_B.map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden pt-[0.04em]">
              <span className="hero-letter inline-block" style={{ '--i': i + 5 }}>
                {ch}
              </span>
            </span>
          ))}
        </span>
      </h1>

      {/* The stage: a sand panel, the group in front, heads over the name */}
      <div className="relative mt-[-9%] sm:mt-[-7%]">
        <motion.div
          className="relative aspect-[16/11] touch-pan-y overflow-x-clip sm:aspect-[16/10]"
          onPanEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 400) go(info.offset.x < 0 ? 1 : -1)
          }}
        >
          <div className="absolute inset-x-0 top-[22%] bottom-0 overflow-hidden rounded-[16px] bg-sand">
            <span aria-hidden="true" className="amp absolute -right-[4%] -bottom-[18%] h-[90%] text-gold/25" />
          </div>
          <div className="absolute inset-x-0 bottom-0 aspect-[16/7.8]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div key={set.id} className="absolute inset-0">
                {set.people.map((p, i) => (
                  <Person key={`${set.id}-${p.cut}`} person={p} slot={SLOTS[i]} index={i} dir={dir} active={active} onHover={setActive} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
        {/* Swipe card (ref: "SWIPE / DISCOVER NOW") */}
        <div className="relative z-10 mt-3 block rounded-[12px] bg-paper p-4 shadow-float sm:absolute sm:bottom-6 sm:left-6 sm:mt-0 sm:w-[250px] sm:bg-paper/95 sm:p-5 sm:backdrop-blur-sm">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={set.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="caps text-[9.5px] text-gold-deep"
            >
              {String(index + 1).padStart(2, '0')} / {String(heroSets.length).padStart(2, '0')} · {set.title}
            </motion.p>
          </AnimatePresence>
          <button type="button" onClick={() => go(1)} className="group mt-2 flex w-full items-center gap-3 text-left" aria-label="Swipe to the next group">
            <span className="display text-[17px] sm:text-[24px]">Swipe</span>
            <span className="relative h-px flex-1 bg-ink transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-x-110 origin-left">
              <Icon name="caret-right" size={14} weight="bold" className="absolute -top-[7px] -right-1" />
            </span>
          </button>
          <Link to={set.to} className="caps link-line mt-2 inline-block text-[9.5px] text-ink-soft sm:mt-3 sm:text-[10px] transition-colors hover:text-ink">
            Discover now
          </Link>
        </div>
      </div>

      <ul className="mt-6 flex justify-between gap-x-4 sm:justify-around">
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer" className="caps link-line text-[9.5px] text-ink sm:text-[11px]">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
