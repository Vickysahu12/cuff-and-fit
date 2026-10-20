import { Link } from 'react-router'
import { site } from '../../config/site'
import { cn } from '../../lib/cn'

// The client's logo (public/brand). In the header the wordmark is set in ink with the gold
// ampersand kept; `full` shows the original cream and gold lockup with "Style that fits
// you", for the ink footer.
export function Logo({ className, full, size = 'md' }) {
  if (full) {
    return (
      <Link to="/" aria-label={`${site.name} home`} className={cn('press inline-block', className)}>
        <img src="/brand/logo.png" alt={site.name} width={579} height={154} draggable={false} className="h-auto w-full max-w-[400px]" />
      </Link>
    )
  }
  return (
    <Link to="/" aria-label={`${site.name} home`} className={cn('press group relative inline-flex items-center', className)}>
      <img
        src="/brand/wordmark-ink.png"
        alt={site.name}
        width={579}
        height={119}
        draggable={false}
        className={cn('w-auto transition-[height,transform] duration-300 ease-[var(--ease-out)] group-hover:scale-[1.02]', size === 'sm' ? 'h-[26px]' : 'h-[28px] sm:h-[34px]')}
      />
    </Link>
  )
}
