import { Html, Head, Main, NextScript } from 'next/document'
import { ReactElement } from 'react'

export default function Document(): ReactElement {
  return (
    <Html lang="en">
      <Head>
        <meta content="#333" name="theme-color" />
        <meta
          content="
            watch movies, movies
            online, watch TV, TV online, TV shows online, watch TV shows, stream movies, stream tv,
            instant streaming, watch online, movies, watch movies Ukraine, watch TV online,
            no download, full length movies
          "
          name="keywords"
        />
        <meta
          content="
            Watch Netflix movies &amp;
            TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.
          "
          name="description"
        />
        <link href="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png" rel="apple-touch-icon" />
        <link href="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico" rel="shortcut icon" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
