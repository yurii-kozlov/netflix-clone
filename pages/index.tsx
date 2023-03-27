import Head from 'next/head';
import React, { ReactElement } from 'react'
import { instance } from 'api/api';
import { GetStaticProps } from 'next';
import { Intro } from 'types/intro/Intro';
import { Header } from 'components/Header';
import { Benefits } from 'components/Benefits/Benefits';
import { FAQ } from 'components/FAQ';
import { Footer } from 'components/Footer';
import { Error } from 'components/Error';

const Home: React.FC<HomeStaticProps> = ({ intro, error }): ReactElement => {
  const {footerLinksList, faq, media} = intro!

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
      <Header netflixLogo={media.images.netflixLogo} />
      <main>
        {error && <Error error={error} />}
        {intro && (
          <>
            <Benefits media={media}/>
            <FAQ faq={faq}/>
            <Footer footerLinksList={footerLinksList} />
          </>
         )}
      </main>
    </>
     )
}

type IntroSuccess = {
  intro: Intro;
  error?: never;
};

type IntroError = {
  intro?: never;
  error: string;
};

type HomeStaticProps = IntroSuccess | IntroError;

export const getStaticProps: GetStaticProps<HomeStaticProps> = async () => {
  try {
    const { data } = await instance.get('/intro');

    return {
      props: {
        intro: data,
      }
    }
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch data'
      }
    }
  }
}

export default Home;
