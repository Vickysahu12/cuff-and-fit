// Brand-level settings. Change the name, offers, fees or contact details here, not in components.
export const site = {
  name: 'Cuff & Fit',
  tagline: 'Style that fits you',
  currency: 'INR',
  locale: 'en-IN',
  freeShippingOver: 1499,
  shippingFee: 79,
  codFee: 49,
  stitchFee: 0,
  orderPrefix: 'CF',
  instagram: '@cuffandfit',
  phone: '+91 98200 04512',
  email: 'hello@cuffandfit.in',

  announcements: ['Free shipping on orders above ₹1,499', 'The signature shirt, now in twelve colours', 'First order? Take 10% off with FIT10'],

  // Coupon codes accepted at bag / checkout (demo).
  coupons: {
    FIT10: { type: 'percent', value: 10, label: '10% off your first order' },
    CUFF250: { type: 'flat', value: 250, label: '₹250 off orders above ₹2,499', min: 2499 },
    PAIRUP: { type: 'flat', value: 600, label: '₹600 off orders above ₹4,499', min: 4499 },
  },

  footer: {
    blurb: 'Tailored shirts for him, co-ords, dresses and tops for her. Style that fits you.',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'Full sleeve shirts', to: '/shop/full-sleeve' },
          { label: 'Half sleeve shirts', to: '/shop/half-sleeve' },
          { label: 'Co-ords', to: '/shop/co-ords' },
          { label: 'Dresses', to: '/shop/dresses' },
          { label: 'Tops', to: '/shop/tops' },
          { label: 'Sale', to: '/shop?sale=1' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Size guide', to: '/help#sizing' },
          { label: 'Shipping', to: '/help#shipping' },
          { label: 'Returns', to: '/help#returns' },
          { label: 'Track order', to: '/account' },
          { label: 'Contact', to: '/help#contact' },
        ],
      },
      {
        title: 'Cuff & Fit',
        links: [
          { label: 'About us', to: '/about' },
          { label: 'Shade studio', to: '/#shades' },
          { label: 'Wishlist', to: '/wishlist' },
          { label: 'Privacy', to: '/help#privacy' },
        ],
      },
    ],
    social: [
      { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
      { label: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
      { label: 'Pinterest', icon: 'pinterest', href: 'https://pinterest.com' },
      { label: 'YouTube', icon: 'youtube', href: 'https://youtube.com' },
    ],
  },
}
