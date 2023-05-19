const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  images: {
    domains: [
      'res.cloudinary.com', 'assets.nflxext.com', 'occ-0-6308-3467.1.nflxso.net',
      'image.tmdb.org'
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  sassOptions: {
    additionalData: `@import "styles/utils/variables.scss"; @import "styles/utils/mixins.scss";
    @import "styles/utils/placeholders.scss";`,
 }
})
