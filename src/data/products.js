// Demo catalogue built from the client's photos (public/media/products/fNN-1, fNN-2, ...).
// `n` is the source photo number (src/assets/image/ImgNN). Photos are high resolution and
// exported at 720 x 960 (3:4). Where the client shot a piece from several angles (14-16,
// 17-18, 43-44) they become one product with several views; otherwise view 2 is a close
// crop of the collar and the weave. `wear` holds who it is for: men or women.
// Shape mirrors what a products API would return, so services/catalog.js can switch to fetch() later.
// Prices sit between ₹999 and ₹3,499; ratings and copy are sample data.

const MEN = ['S', 'M', 'L', 'XL', 'XXL']
const WOMEN = ['XS', 'S', 'M', 'L', 'XL']

const SHIRT_CARE = ['Machine wash cold, inside out', 'Hang to dry', 'Iron on medium while slightly damp']

const CATEGORY = {
  'full-sleeve': { sizes: MEN, includes: 'One shirt', care: SHIRT_CARE, wear: ['men'] },
  'half-sleeve': { sizes: MEN, includes: 'One shirt', care: SHIRT_CARE, wear: ['men'] },
  'co-ords': { sizes: WOMEN, includes: 'Top and bottom', care: ['Machine wash cold, gentle', 'Dry in shade', 'Iron on low'], wear: ['women'] },
  dresses: { sizes: WOMEN, includes: 'One dress', care: ['Hand wash or gentle machine wash', 'Dry in shade', 'Iron on low, on the reverse'], wear: ['women'] },
  tops: { sizes: WOMEN, includes: 'One top', care: ['Machine wash cold, gentle', 'Dry in shade', 'Iron on low'], wear: ['women'] },
}

const item = (category) => (p) => {
  const base = { category, ...CATEGORY[category], ...p }
  return { ...base, occasions: base.wear }
}
const full = item('full-sleeve')
const half = item('half-sleeve')
const coord = item('co-ords')
const dress = item('dresses')
const top = item('tops')

const raw = [
  full({ n: 1, name: 'White Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'White', hex: '#f2f0ea', price: 1499, rating: 4.8, reviews: 214, family: 'signature', bestseller: true, badge: 'Bestseller', blurb: 'The white shirt, cut close through the body with a firm spread collar and two-button cuffs.' }),
  half({ n: 2, name: 'Sand Linen Half Sleeve', fabric: 'Linen Blend', fit: 'Regular', color: 'Sand', hex: '#c9b49c', price: 1199, rating: 4.6, reviews: 88, family: 'linen-half', blurb: 'Sand linen with short sleeves that sit mid-bicep. Summer in one shirt.' }),
  half({ n: 3, name: 'White Pocket Linen Shirt', fabric: 'Pure Linen', fit: 'Relaxed', color: 'White', hex: '#f4f2ec', price: 1299, rating: 4.7, reviews: 76, blurb: 'Breezy white linen with a single patch pocket and a soft camp collar.' }),
  full({ n: 4, name: 'Black Stretch Shirt', fabric: 'Cotton Stretch', fit: 'Slim', color: 'Black', hex: '#141414', price: 1399, rating: 4.8, reviews: 167, family: 'stretch', bestseller: true, blurb: 'A slim black shirt with a little stretch, so it moves when you do.' }),
  full({ n: 5, name: 'Slate Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'Slate', hex: '#8d9096', price: 1499, rating: 4.7, reviews: 92, family: 'signature', blurb: 'The signature shirt in a cool slate grey. Navy trousers, done.' }),
  half({ n: 6, name: 'Olive Linen Half Sleeve', fabric: 'Linen Blend', fit: 'Regular', color: 'Olive', hex: '#6a5a2c', price: 1199, rating: 4.6, reviews: 59, family: 'linen-half', blurb: 'Olive-brown linen with short sleeves. Wear it with cream chinos.' }),
  full({ n: 7, name: 'Silver Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'Silver', hex: '#b9bcbf', price: 1499, rating: 4.6, reviews: 63, family: 'signature', blurb: 'A pale silver-grey signature shirt with a fine twill face.' }),
  half({ n: 8, name: 'Mauve Linen Half Sleeve', fabric: 'Linen Blend', fit: 'Regular', color: 'Mauve', hex: '#9e7f78', price: 1199, rating: 4.5, reviews: 41, family: 'linen-half', blurb: 'Dusty mauve linen, short sleeves, a relaxed collar.' }),
  full({ n: 9, name: 'Espresso Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'Espresso', hex: '#3a2a21', price: 1499, rating: 4.7, reviews: 84, family: 'signature', blurb: 'Deep espresso brown, for evenings when black feels obvious.' }),
  full({ n: 10, name: 'Bottle Green Stretch Shirt', fabric: 'Cotton Stretch', fit: 'Slim', color: 'Bottle Green', hex: '#2c4a32', price: 1399, rating: 4.7, reviews: 57, family: 'stretch', isNew: true, badge: 'New', blurb: 'A slim bottle-green shirt that looks sharp untucked.' }),
  coord({ n: 11, name: 'Cocoa Top and Maxi Skirt Set', fabric: 'Crepe', fit: 'Relaxed', color: 'Cocoa', hex: '#5a3a2c', price: 2799, rating: 4.7, reviews: 46, blurb: 'A short-sleeve cocoa top over a flowing black maxi skirt. Dinner, sorted.' }),
  top({ n: 12, name: 'Cocoa Ribbed Tee', fabric: 'Cotton Rib', fit: 'Regular', color: 'Cocoa', hex: '#5d4234', price: 999, rating: 4.6, reviews: 71, family: 'ribbed-tee', blurb: 'A soft ribbed tee in cocoa. Tuck it into wide denim.' }),
  top({ n: 13, name: 'Olive Ribbed Tee', fabric: 'Cotton Rib', fit: 'Regular', color: 'Olive', hex: '#5e6040', price: 999, rating: 4.6, reviews: 54, family: 'ribbed-tee', blurb: 'The ribbed tee in a muted olive.' }),
  full({ n: 14, name: 'Lilac Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'Lilac', hex: '#cdb7d6', price: 1499, rating: 4.8, reviews: 103, family: 'signature', bestseller: true, badge: 'Bestseller', blurb: 'The signature shirt in soft lilac, shown front, cuffed and relaxed.' }),
  coord({ n: 17, name: 'Scarlet Knit Co-ord', fabric: 'Fine Knit', fit: 'Relaxed', color: 'Scarlet', hex: '#b5281f', price: 3299, rating: 4.8, reviews: 62, isNew: true, badge: 'New', blurb: 'A scarlet knit top and wide trousers. Soft enough to lounge in, bold enough to go out.' }),
  dress({ n: 19, name: 'Walnut Pintuck Maxi Dress', fabric: 'Cotton Poplin', fit: 'Flared', color: 'Walnut', hex: '#5b3d2c', price: 2499, rating: 4.7, reviews: 38, blurb: 'A sleeveless walnut maxi with pintucks running down the front.' }),
  dress({ n: 20, name: 'Denim Smocked Sundress', fabric: 'Chambray', fit: 'Flared', color: 'Denim', hex: '#3d4f6e', price: 2299, rating: 4.6, reviews: 44, blurb: 'Strappy chambray with a smocked bodice and embroidered trim.' }),
  dress({ n: 21, name: 'Sky Strappy Midi Dress', fabric: 'Chambray', fit: 'Flared', color: 'Sky', hex: '#9bb6cf', price: 2199, rating: 4.6, reviews: 37, blurb: 'A light sky-blue midi with skinny straps and a full skirt.' }),
  top({ n: 22, name: 'Maroon Relaxed Shirt', fabric: 'Viscose Crepe', fit: 'Relaxed', color: 'Maroon', hex: '#5a2a26', price: 1399, rating: 4.7, reviews: 66, blurb: 'A fluid maroon shirt with a curved hem. Cream trousers, gold hoops.' }),
  coord({ n: 23, name: 'Olive Shirt and Trouser Set', fabric: 'Cotton Twill', fit: 'Relaxed', color: 'Olive', hex: '#5a5b33', price: 2999, rating: 4.7, reviews: 52, blurb: 'A matching olive shirt and straight trouser. One decision, whole outfit.' }),
  top({ n: 24, name: 'Black Embroidered Sweater Top', fabric: 'Knit', fit: 'Regular', color: 'Black', hex: '#1b1a1a', price: 1499, rating: 4.7, reviews: 58, blurb: 'Black knit with cream floral embroidery across the yoke.' }),
  top({ n: 25, name: 'Black Polka Knit Top', fabric: 'Knit', fit: 'Regular', color: 'Black', hex: '#1f1e1e', price: 1299, rating: 4.5, reviews: 33, family: 'polka', blurb: 'Raised cream dots on a black knit. Easy over wide denim.' }),
  top({ n: 26, name: 'Cream Polka Knit Top', fabric: 'Knit', fit: 'Regular', color: 'Cream', hex: '#efe7d8', price: 1299, rating: 4.6, reviews: 39, family: 'polka', blurb: 'The polka knit in cream with black dots and puff sleeves.' }),
  dress({ n: 27, name: 'White Polka Midi Dress', fabric: 'Georgette', fit: 'Flared', color: 'White', hex: '#efedea', price: 1999, compareAt: 2499, rating: 4.6, reviews: 49, badge: 'Sale', blurb: 'A sleeveless white midi with black dots and a slim black belt.' }),
  dress({ n: 29, name: 'Blush Halter Dress', fabric: 'Crepe', fit: 'Straight', color: 'Blush', hex: '#d9a9a0', price: 2499, rating: 4.7, reviews: 31, isNew: true, badge: 'New', blurb: 'A blush halter-neck dress with a draped bodice.' }),
  top({ n: 30, name: 'Olive Satin Wrap Shirt', fabric: 'Satin', fit: 'Regular', color: 'Olive', hex: '#6c6539', price: 1599, rating: 4.8, reviews: 81, bestseller: true, badge: 'Bestseller', blurb: 'Olive satin that twists at the waist, with full sleeves and gathered cuffs.' }),
  top({ n: 31, name: 'Black Button-Down Shirt', fabric: 'Cotton', fit: 'Regular', color: 'Black', hex: '#1c1b1b', price: 1299, rating: 4.6, reviews: 47, blurb: 'A short black shirt with flap pockets, made for high-waist denim.' }),
  top({ n: 32, name: 'Emerald Puff Sleeve Top', fabric: 'Crepe', fit: 'Regular', color: 'Emerald', hex: '#24493a', price: 1199, rating: 4.6, reviews: 36, blurb: 'A deep emerald top with soft puff sleeves.' }),
  top({ n: 33, name: 'Garden Flutter Sleeve Top', fabric: 'Georgette', fit: 'Relaxed', color: 'Cream Floral', hex: '#e8dcc2', price: 1399, rating: 4.7, reviews: 64, blurb: 'Painted florals on cream, with wide flutter sleeves.' }),
  coord({ n: 34, name: 'Tan Ribbed Co-ord', fabric: 'Rib Knit', fit: 'Relaxed', color: 'Tan', hex: '#9a6a43', price: 2499, rating: 4.6, reviews: 42, family: 'rib-coord', blurb: 'A tan ribbed top and straight trousers, soft as a sweater.' }),
  coord({ n: 35, name: 'Navy Ribbed Co-ord', fabric: 'Rib Knit', fit: 'Relaxed', color: 'Navy', hex: '#26315a', price: 2499, rating: 4.7, reviews: 55, family: 'rib-coord', blurb: 'The ribbed co-ord in a deep navy.' }),
  coord({ n: 36, name: 'Slate Utility Co-ord', fabric: 'Cotton Twill', fit: 'Relaxed', color: 'Slate', hex: '#6a6a60', price: 3499, rating: 4.7, reviews: 29, blurb: 'A short-sleeve utility shirt with a drawcord waist and matching wide trousers.' }),
  half({ n: 37, name: 'Indigo Linen Half Sleeve', fabric: 'Pure Linen', fit: 'Regular', color: 'Indigo', hex: '#3e6489', price: 1299, rating: 4.7, reviews: 72, blurb: 'Washed indigo linen with short sleeves. The holiday shirt.' }),
  half({ n: 38, name: 'Khaki Linen Half Sleeve', fabric: 'Linen Blend', fit: 'Regular', color: 'Khaki', hex: '#8d8466', price: 1199, rating: 4.6, reviews: 49, family: 'linen-half', blurb: 'Khaki linen with short sleeves and a neat collar.' }),
  full({ n: 39, name: 'Ivory Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'Ivory', hex: '#ece5cc', price: 1499, rating: 4.7, reviews: 77, family: 'signature', blurb: 'Warm ivory instead of white. Softer, and better with tan.' }),
  full({ n: 40, name: 'Black Linen Button-Down', fabric: 'Pure Linen', fit: 'Regular', color: 'Black', hex: '#1a1a19', price: 1699, rating: 4.8, reviews: 96, isNew: true, badge: 'New', blurb: 'Black linen with a button-down collar and horn buttons.' }),
  full({ n: 41, name: 'Mint Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'Mint', hex: '#a9cfa4', price: 1499, rating: 4.7, reviews: 68, family: 'signature', blurb: 'A fresh mint signature shirt with French-style cuffs.' }),
  half({ n: 42, name: 'Fern Linen Half Sleeve', fabric: 'Linen Blend', fit: 'Regular', color: 'Fern', hex: '#4a7a46', price: 1199, rating: 4.6, reviews: 45, family: 'linen-half', blurb: 'Fern green linen with short sleeves.' }),
  half({ n: 43, name: 'Peach Linen Half Sleeve', fabric: 'Linen Blend', fit: 'Regular', color: 'Peach', hex: '#e6ae94', price: 1199, rating: 4.7, reviews: 58, family: 'linen-half', blurb: 'Peach linen, short sleeves, shown straight on and from the side.' }),
  half({ n: 45, name: 'Pink Linen Half Sleeve', fabric: 'Linen Blend', fit: 'Regular', color: 'Pink', hex: '#efc7cc', price: 1199, rating: 4.6, reviews: 51, family: 'linen-half', blurb: 'Pale pink linen with short sleeves. Better than you think.' }),
  half({ n: 46, name: 'Sage Linen Half Sleeve', fabric: 'Linen Blend', fit: 'Regular', color: 'Sage', hex: '#8aa38a', price: 1199, rating: 4.7, reviews: 62, family: 'linen-half', blurb: 'Sage linen with short sleeves and a soft collar.' }),
  full({ n: 47, name: 'Cobalt Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'Cobalt', hex: '#27507e', price: 1499, rating: 4.8, reviews: 118, family: 'signature', bestseller: true, badge: 'Bestseller', blurb: 'Deep cobalt with a satin sheen. The one that gets noticed.' }),
  half({ n: 48, name: 'White Camp Collar Shirt', fabric: 'Pure Linen', fit: 'Relaxed', color: 'White', hex: '#f1efe9', price: 1299, rating: 4.6, reviews: 43, blurb: 'White linen with a flat camp collar and short sleeves.' }),
  full({ n: 49, name: 'Maroon Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'Maroon', hex: '#5e1f24', price: 1499, rating: 4.8, reviews: 131, family: 'signature', bestseller: true, blurb: 'Rich maroon, cut close, with cuffs made to be fastened just so.' }),
  full({ n: 50, name: 'Taupe Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'Taupe', hex: '#9b8379', price: 1499, rating: 4.6, reviews: 47, family: 'signature', blurb: 'A soft taupe signature shirt for beige and brown trousers.' }),
  full({ n: 51, name: 'Teal Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'Teal', hex: '#2b6467', price: 1499, rating: 4.7, reviews: 66, family: 'signature', blurb: 'A deep teal signature shirt with a faint sheen.' }),
  full({ n: 52, name: 'Navy Stretch Shirt', fabric: 'Cotton Stretch', fit: 'Slim', color: 'Navy', hex: '#1c2236', price: 1399, rating: 4.7, reviews: 88, family: 'stretch', blurb: 'The slim stretch shirt in navy. Grey trousers, brown belt.' }),
  full({ n: 53, name: 'Emerald Signature Shirt', fabric: 'Giza Cotton', fit: 'Tailored', color: 'Emerald', hex: '#2f6f3a', price: 1499, compareAt: 1899, rating: 4.7, reviews: 59, family: 'signature', badge: 'Sale', blurb: 'A bold emerald signature shirt with a fine dobby weave.' }),
  full({ n: 54, name: 'Teal Stretch Shirt', fabric: 'Cotton Stretch', fit: 'Slim', color: 'Teal', hex: '#22656c', price: 1399, rating: 4.6, reviews: 41, family: 'stretch', blurb: 'The slim stretch shirt in a bright teal.' }),
  full({ n: 55, name: 'Petrol Stretch Shirt', fabric: 'Cotton Stretch', fit: 'Slim', color: 'Petrol', hex: '#1d4f63', price: 1399, compareAt: 1699, rating: 4.6, reviews: 37, family: 'stretch', badge: 'Sale', blurb: 'A petrol-blue stretch shirt. Sharp with charcoal.' }),
]

const VIEWS = { 14: 3, 17: 2, 43: 2 }
const slugify = (s) => s.toLowerCase().replace(/[’']/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const id = (n) => `f${String(n).padStart(2, '0')}`

export const products = raw.map(({ n, ...p }) => ({
  id: id(n),
  slug: slugify(p.name),
  images: Array.from({ length: VIEWS[n] ?? 2 }, (_, i) => `${id(n)}-${i + 1}`),
  cut: `${p.fit} fit`,
  model: p.wear[0] === 'women' ? 'S' : 'M',
  ...p,
}))

export const getProduct = (pid) => products.find((p) => p.id === pid)
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)
