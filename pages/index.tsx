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
        headers: {
          'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=59',
        }
      },
      revalidate: 40,
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
