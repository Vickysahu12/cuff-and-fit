# Cuff & Fit

A demo storefront for Cuff & Fit, "Style that fits you": tailored full and half sleeve shirts for men, and co-ords, dresses and tops for women. 50 pieces from ₹999 to ₹3,499.

## Run it

```bash
npm install
npm run dev
```

Build with `npm run build`, then preview with `npm run preview`.

## What works

- **Home:**
  - A giant CUFF & FIT hero with a group of three in front.
  - Swipe (or drag) to change the group; hover a person to see what they are wearing.
  - Shop by collection and best sellers.
  - A side column with:
    - new collection
    - promises
    - a limited offer
    - customer reviews
    - newsletter
  - A strip of type.
  - Shade studio: drag along twelve colours of the signature shirt, pick a size and add it to the bag.
  - The women's edit, coupon codes and an Instagram wall.
- **Shop:**
  - Men / Women pills.
  - Categories: Full sleeve, Half sleeve, Co-ords, Dresses, Tops.
  - Filters in the URL: fabric, shop for, colour, price.
  - Sort, and search with suggestions.
- **Product page:**
  - Gallery with zoom (two or three views per piece).
  - Colour siblings, sizes (S to XXL men, XS to XL women) and a size guide.
  - Pincode check, reviews, related and recently viewed.
- **Bag:**
  - Drawer and full page, with free shipping over ₹1,499.
  - Coupons:
    - `FIT10`
    - `CUFF250` (₹2,499+)
    - `PAIRUP` (₹4,499+)
- **Checkout:**
  - Address with pincode autofill, then UPI, card, net banking or COD (₹49).
  - Order confirmation and order history on this device.
- **Also:** wishlist, account, help/FAQ, about us, a 404 page and an error page.

All data is local (`src/data`). The cart, wishlist and orders are saved in localStorage. No real payment is taken. Reviews and customer notes are sample content.

## Stack

- Vite, React 19, React Router 7 and Tailwind CSS v4
- Motion, Lenis and Phosphor icons
- Outfit and Manrope fonts
