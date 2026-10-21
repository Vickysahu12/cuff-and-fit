import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { aside, testimonials, cutout } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { subscribe } from '../../services/newsletter'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

const PROMISES = [
  { icon: 'medal', title: 'Premium quality', body: 'Giza cotton, pure linen, fine knits' },
  { icon: 'truck', title: 'Free shipping', body: 'On all orders above ₹1,499' },
  { icon: 'returns', title: 'Easy returns', body: 'Free pickup within 7 days' },
  { icon: 'shield', title: 'Secure payment', body: 'UPI, cards, net banking or COD' },
]
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function NewCollection() {
  const c = aside.newCollection
  return (
    <Link to={c.to} className="group grid grid-cols-[minmax(0,1fr)_42%] overflow-hidden rounded-[16px] bg-sand">
      <div className="flex flex-col p-5">
        <p className="caps text-[9px] text-ink-soft">{c.kicker}</p>
        <h2 className="display mt-3 text-[24px] leading-[0.95]">{c.title}</h2>
        <p className="mt-3 text-[13px] leading-snug text-ink-soft">{c.body}</p>
        <span className="btn mt-auto h-9 self-start px-4 text-[10px]">
          Shop now <Icon name="arrow" size={13} className="btn-arrow" />
        </span>
      </div>
      <Img id={c.image} alt="" className="aspect-[3/4] h-full" position="50% 15%" imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.06]" />
    </Link>
  )
}

function Promises() {
  return (
    <ul className="panel space-y-4 p-5">
      {PROMISES.map((p) => (
        <li key={p.title} className="group flex items-center gap-3.5">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-ink transition-[background-color,color,rotate] duration-300 group-hover:-rotate-6 group-hover:bg-ink group-hover:text-gold">
            <Icon name={p.icon} size={20} />
          </span>
          <span>
            <span className="caps block text-[10px] text-ink">{p.title}</span>
            <span className="mt-0.5 block text-[12.5px] text-ink-soft">{p.body}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

function Offer() {
  const o = aside.offer
  return (
    <Link to={o.to} className="group relative block min-h-[260px] overflow-hidden rounded-[16px] bg-ink p-5 text-cream">
      <p className="caps text-[9.5px] text-gold">{o.kicker}</p>
      <p className="display mt-3 text-[18px]">{o.lead}</p>
      <p className="display text-[40px] leading-[0.9] text-gold">{o.value}</p>
      <p className="mt-3 max-w-[13ch] text-[12.5px] text-cream/75">{o.body}</p>
      <span className="btn mt-5 h-9 px-4 text-[10px] [--btn-bg:var(--color-cream)] [--btn-fg:var(--color-ink)]">
        Shop sale <Icon name="arrow" size={13} className="btn-arrow" />
      </span>
      <img
        src={cutout(o.cut)}
        alt=""
        width={500}
        height={900}
        loading="lazy"
        className="pointer-events-none absolute -right-12 bottom-0 h-[96%] w-auto max-w-none transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-y-1.5"
      />
    </Link>
  )
}

function Reviews() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const t = testimonials[i]
  const product = getProductSync(t.productId)

  useEffect(() => {
    if (paused || reduce) return
    const id = setTimeout(() => setI((n) => (n + 1) % testimonials.length), 5200)
    return () => clearTimeout(id)
  }, [i, paused, reduce])

  return (
    <section className="panel p-5" aria-labelledby="reviews-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <h2 id="reviews-title" className="display text-[17px]">
        What our customers say
      </h2>
      <Icon name="quote" size={26} weight="fill" className="mt-4 text-gold" />
      <div className="relative min-h-[150px]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
            <blockquote className="mt-2 text-[14px] leading-relaxed text-ink">{t.text}</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <Img id={product.images[0]} alt="" className="size-9 rounded-full" position="50% 15%" />
              <span>
                <span className="block text-[13px] font-semibold text-ink">
                  {t.name}, {t.city}
                </span>
                <span className="flex" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, k) => (
                    <Icon key={k} name="star" size={11} weight={k < t.rating ? 'fill' : 'regular'} className="text-gold-deep" />
                  ))}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex items-center gap-1.5" role="group" aria-label="Choose a review">
        {testimonials.map((r, n) => (
          <button key={r.name} type="button" onClick={() => setI(n)} aria-label={`Review ${n + 1}`} aria-pressed={n === i} className="grid h-6 place-items-center px-0.5">
            <span className={cn('block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out)]', n === i ? 'w-5 bg-ink' : 'w-1.5 bg-line-strong hover:bg-ink-soft')} />
          </button>
        ))}
      </div>
    </section>
  )
}

function StayUpdated() {
  const id = useId()
  const n = aside.newsletter
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) return setError('Please enter a valid email.')
    setError('')
    setState('sending')
    await subscribe(email.trim())
    setState('done')
  }

  return (
    <section className="relative overflow-hidden rounded-[16px] bg-sand p-5" aria-labelledby={`${id}-t`}>
      <div className="relative z-10 max-w-[62%]">
        <h2 id={`${id}-t`} className="display text-[19px]">
          {n.title}
        </h2>
        <p className="mt-2 text-[12.5px] leading-snug text-ink-soft">{n.body}</p>
      </div>
      {state === 'done' ? (
        <p role="status" className="anim-fade-up relative z-10 mt-4 flex max-w-[70%] items-center gap-2 rounded-[10px] bg-paper px-3 py-2.5 text-[13px] font-semibold text-ink">
          <Icon name="check-circle" size={18} weight="fill" className="text-success" /> You are on the list.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative z-10 mt-4 max-w-[70%] space-y-2">
          <label htmlFor={id} className="sr-only">
            Email address
          </label>
          <input id={id} type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" aria-invalid={Boolean(error)} className="field h-10 bg-paper px-4 text-[13px]" />
          <Button type="submit" size="sm" disabled={state === 'sending'} className="w-full">
            {state === 'sending' ? 'Subscribing' : 'Subscribe'}
          </Button>
          <p role="alert" className="min-h-4 text-[12px] text-danger">
            {error}
          </p>
        </form>
      )}
      <Img id={n.image} alt="" className="absolute! -right-4 bottom-0 aspect-[3/4] w-[46%] [mask-image:linear-gradient(to_left,black_60%,transparent)]" position="50% 10%" />
    </section>
  )
}

/** The inspo's right-hand column of cards. */
export function Aside() {
  return (
    <aside aria-label="Offers and updates" className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:self-start lg:pt-8">
      <NewCollection />
      <Promises />
      <Offer />
      <Reviews />
      <StayUpdated />
    </aside>
  )
}
