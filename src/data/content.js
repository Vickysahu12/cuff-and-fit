// Editorial content for the storefront. Kept out of components so the client
// (or a CMS later) can change copy and imagery in one place.
// Image ids refer to public/media/products (fNN-1 the look, fNN-2 a second view or a close
// crop). Hero cut-outs live in public/media/hero (background removed, 900px tall).

export const cutout = (n) => `/media/hero/cut${n}.webp`

// Hero: groups of three that "swipe" in turn. The middle figure stands a little lower.
export const heroSets = [
  {
    id: 'cuff',
    title: 'The cuff edit',
    line: 'Shirts cut close, with cuffs made to be fastened just so.',
    people: [
      { cut: 49, productId: 'f49' },
      { cut: 30, productId: 'f30' },
      { cut: 41, productId: 'f41' },
    ],
    to: '/shop/full-sleeve',
  },
  {
    id: 'evening',
    title: 'Office to evening',
    line: 'Cobalt, black linen and painted florals for after six.',
    people: [
      { cut: 47, productId: 'f47' },
      { cut: 33, productId: 'f33' },
      { cut: 40, productId: 'f40' },
    ],
    to: '/shop?sort=new',
  },
]

export const perks = [
  { icon: 'truck', title: 'Free shipping', body: 'On orders above ₹1,499' },
  { icon: 'returns', title: 'Easy 7-day returns', body: 'Free pickup from home' },
  { icon: 'cash', title: 'Cash on delivery', body: 'Pay when it arrives' },
  { icon: 'ruler', title: 'Size exchange', body: 'Wrong fit? Swap it free' },
]

export const categoryLabels = {
  'full-sleeve': 'Full sleeve shirts',
  'half-sleeve': 'Half sleeve shirts',
  'co-ords': 'Co-ords',
  dresses: 'Dresses',
  tops: 'Tops and shirts',
}

export const categorySingular = {
  'full-sleeve': 'Full sleeve',
  'half-sleeve': 'Half sleeve',
  'co-ords': 'Co-ord set',
  dresses: 'Dress',
  tops: 'Top',
}

export const categories = [
  { id: 'full-sleeve', label: 'Full sleeve', for: 'Men', image: 'f49-1', to: '/shop/full-sleeve' },
  { id: 'half-sleeve', label: 'Half sleeve', for: 'Men', image: 'f46-1', to: '/shop/half-sleeve' },
  { id: 'co-ords', label: 'Co-ords', for: 'Women', image: 'f23-1', to: '/shop/co-ords' },
  { id: 'dresses', label: 'Dresses', for: 'Women', image: 'f29-1', to: '/shop/dresses' },
  { id: 'tops', label: 'Tops', for: 'Women', image: 'f30-1', to: '/shop/tops' },
]

// "Shop for" lives in each product's `occasions`.
export const occasionLabels = {
  men: 'Men',
  women: 'Women',
}

export const occasions = Object.entries(occasionLabels).map(([id, label]) => ({ id, label }))

// Home: best sellers and the women's edit.
export const bestSellers = { title: 'Best sellers', ids: ['f49', 'f30', 'f47', 'f14'], to: '/shop?bestseller=1' }
export const womensEdit = { title: 'The women’s edit', ids: ['f17', 'f23', 'f33', 'f29', 'f22', 'f35', 'f20', 'f24'], to: '/shop?occasion=women' }

// The side column (ref: the inspo's right-hand cards).
export const aside = {
  newCollection: { kicker: 'New collection', title: 'Linen half sleeves', body: 'Breathable linen in eight soft colours.', image: 'f46-1', to: '/shop/half-sleeve' },
  offer: { kicker: 'Limited offer', lead: 'Up to', value: '25% off', body: 'On selected shirts and dresses', cut: 40, to: '/shop?sale=1' },
  newsletter: { title: 'Stay updated', body: 'New drops, early sale access and 10% off your first order.', image: 'f39-1' },
}

// Shade studio: every signature shirt, in order of colour.
export const shadeStudio = {
  title: 'Every shade, one fit',
  body: 'One tailored shirt in twelve colours. Drag along the spectrum, or tap a colour, and he changes shirts.',
  ids: ['f01', 'f39', 'f07', 'f05', 'f14', 'f50', 'f49', 'f09', 'f53', 'f41', 'f51', 'f47'],
}

export const marquee = ['Style that fits you', 'Shirts cut close', 'Linen for summer', 'Co-ords for her', 'Free shipping above ₹1,499']

// Sample customer notes (demo content).
export const testimonials = [
  { name: 'Arjun M.', city: 'Mumbai', rating: 5, productId: 'f49', text: 'The maroon shirt fits like it was made for me. Shoulders sit right, sleeves are the perfect length.' },
  { name: 'Riya S.', city: 'Pune', rating: 5, productId: 'f30', text: 'The olive satin wrap shirt is so flattering. Got compliments the first time I wore it.' },
  { name: 'Kabir N.', city: 'Delhi', rating: 5, productId: 'f47', text: 'Cobalt colour is even richer in person. Ordered the lilac next.' },
  { name: 'Meera K.', city: 'Bengaluru', rating: 4, productId: 'f35', text: 'The navy co-ord is my travel outfit now. Soft and it never creases.' },
]

export const offers = [
  { title: '10% off your first order', code: 'FIT10' },
  { title: '₹250 off orders above ₹2,499', code: 'CUFF250' },
  { title: '₹600 off orders above ₹4,499', code: 'PAIRUP' },
]

export const serviceRow = perks

// Review pool used to fill product pages (demo).
export const reviewPool = [
  { name: 'Aman K.', rating: 5, title: 'Great fit', text: 'Fits true to size and the shoulders sit right. The fabric feels premium.' },
  { name: 'Sana R.', rating: 5, title: 'Bought two colours', text: 'Liked it so much I ordered it again in another shade.' },
  { name: 'Nikhil P.', rating: 4, title: 'Slightly long', text: 'Sleeves are a little long on me, but folded once it looks great.' },
  { name: 'Varun S.', rating: 5, title: 'Fast delivery', text: 'Arrived in three days, well packed. Quality is better than expected.' },
  { name: 'Ishita M.', rating: 4, title: 'Good value', text: 'Neat stitching, colour exactly as shown. Would buy again.' },
]

export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'New in' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

export const priceBands = [
  { id: 'u1299', label: 'Under ₹1,300', min: 0, max: 1299 },
  { id: '1300-1599', label: '₹1,300 to ₹1,599', min: 1300, max: 1599 },
  { id: '1600-2499', label: '₹1,600 to ₹2,499', min: 1600, max: 2499 },
  { id: '2500-3499', label: '₹2,500 and above', min: 2500, max: 3499 },
]

// Body measurements in inches. Men: chest, waist, shirt length. Women: bust, waist, hip.
export const sizeChart = [
  ['S', '38', '32', '28'],
  ['M', '40', '34', '28.5'],
  ['L', '42', '36', '29'],
  ['XL', '44', '38', '29.5'],
  ['XXL', '46', '40', '30'],
]
