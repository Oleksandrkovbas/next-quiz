const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withImages = require('next-images');

const isProd = process.env.NODE_ENV === 'production';

module.exports = withImages(
  withFonts(
    withSass({
      enableSvg: true,
      assetPrefix: isProd ? '/quiz/learning-type' : '',
    })
  )
);
