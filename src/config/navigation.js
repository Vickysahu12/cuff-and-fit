// Navigation content: the mega-menu panels (desktop), menu tabs (phone) and quick chips.

export const megaMenus = [
  {
    id: 'shop',
    label: 'Categories',
    to: '/shop',
    columns: [
      {
        title: 'For him and her',
        items: [
          { label: 'Full sleeve', desc: 'Signature and stretch shirts', image: 'f49-1', to: '/shop/full-sleeve' },
          { label: 'Half sleeve', desc: 'Linen in soft colours', image: 'f46-1', to: '/shop/half-sleeve' },
          { label: 'Co-ords', desc: 'Matching sets', image: 'f23-1', to: '/shop/co-ords' },
          { label: 'Dresses', desc: 'Midis and maxis', image: 'f29-1', to: '/shop/dresses' },
          { label: 'Tops', desc: 'Satin, knit and florals', image: 'f30-1', to: '/shop/tops' },
        ],
      },
    ],
    feature: { image: 'f47-1', title: 'The Cobalt Signature Shirt', to: '/product/cobalt-signature-shirt' },
  },
  {
    id: 'new',
    label: 'New arrivals',
    to: '/shop?sort=new',
    columns: [
      {
        title: 'Just in',
        items: [
          { label: 'Scarlet Knit Co-ord', desc: 'Soft, bold, two pieces', image: 'f17-1', to: '/product/scarlet-knit-co-ord' },
          { label: 'Black Linen Button-Down', desc: 'Horn buttons', image: 'f40-1', to: '/product/black-linen-button-down' },
          { label: 'Blush Halter Dress', desc: 'Draped bodice', image: 'f29-1', to: '/product/blush-halter-dress' },
          { label: 'Bottle Green Stretch Shirt', desc: 'Slim and easy', image: 'f10-1', to: '/product/bottle-green-stretch-shirt' },
          { label: 'Bestsellers', desc: 'Most reordered', image: 'f14-1', to: '/shop?bestseller=1' },
        ],
      },
    ],
    feature: { image: 'f17-1', title: 'The Scarlet Knit Co-ord', to: '/product/scarlet-knit-co-ord' },
  },
]

export const navLinks = []

// The pills on the right of the second header row (ref: Men / Women / Children / Premium).
export const genderPills = [
  { label: 'Men', to: '/shop?occasion=men' },
  { label: 'Women', to: '/shop?occasion=women' },
  { label: 'New', to: '/shop?sort=new' },
  { label: 'Sale', to: '/shop?sale=1', accent: true },
]

export const quickChips = [
  { label: 'Men', to: '/shop?occasion=men' },
  { label: 'Women', to: '/shop?occasion=women' },
  { label: 'Full sleeve', to: '/shop/full-sleeve' },
  { label: 'Half sleeve', to: '/shop/half-sleeve' },
  { label: 'Co-ords', to: '/shop/co-ords' },
  { label: 'Dresses', to: '/shop/dresses' },
  { label: 'Tops', to: '/shop/tops' },
  { label: 'Sale', to: '/shop?sale=1', accent: true },
]
