import Head from 'next/head';
import { ReactElement } from 'react'
import { Header } from 'components/Header';


export default function Home(): ReactElement {
  return (
    <>
      <Head>
        <title>Netflix Ukraine - Watch TV Shows Online, Watch Movies Online</title>
        <meta content="watch movies, movies
          online, watch TV, TV online, TV shows online, watch TV shows, stream movies, stream tv,
          instant streaming, watch online, movies, watch movies Ukraine, watch TV online,
          no download, full length movies"
          name="keywords"
        />
        <meta content="Watch Netflix movies &amp;
          TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more."
          name="description"
        />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Header />
    </>
  )
}
