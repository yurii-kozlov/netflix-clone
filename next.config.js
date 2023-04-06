module.exports = {
  images: {
    domains: [
      'res.cloudinary.com', 'assets.nflxext.com', 'occ-0-6308-3467.1.nflxso.net'
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
}
