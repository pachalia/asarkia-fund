import {NextPageWithLayout} from './_app';
import React, {ReactElement, useEffect, useState} from 'react';
import LayoutMobile from '../Components/Layouts/Mobile/LayoutMobile';
import {GetServerSideProps, GetServerSidePropsContext} from 'next';
import {PostService} from '../services/post.service';
import {PostForMobile} from '../models/posts.model';
import PostsMobile from '../Components/PostsMobile/PostsMobile';
import Loading from '../Components/Loading/Loading';
import Head from 'next/head';

const Mobile: NextPageWithLayout<{
  posts: PostForMobile[];
  loading: boolean;
}> = ({ posts, loading }) => {
  const [landscape, setLandscape] = useState(true);
  useEffect(() => {
    setLandscape(window.matchMedia('(orientation: landscape)').matches);
    window
      .matchMedia('(orientation: landscape)')
      .addEventListener('change', (e) => setLandscape(e.matches));
  }, []);
  const [load, setLoad] = useState(loading);
  useEffect(() => {
    if (posts) {
      setLoad(false);
    }
  }, [posts]);
  const text = (
    <div className="fond_text">
      <p
        style={{
          fontFamily: 'Montserrat400',
          fontSize: !landscape ? '0.8rem' : 'inherit',
        }}
      >
        <span style={{ fontFamily: 'Montserrat700' }}>Фонд «Асаркьа» </span>
        создан в 2010 году для информационной поддержки различных гражданских
        инициатив, направленных на развитие и укрепление демократических
        институтов в Абхазии. В фокусе нашей работы поддержка проектов
        экологической направленности, разработка механизмов по соблюдению и
        защите прав женщин, сохранение мультикультурной среды в Абхазии. Наша
        цель – правовое, гуманное общество, в котором защищены интересы всех
        наших граждан!
      </p>
    </div>
  );
  return (
    <>
      <Head>
        <title>Главная | Общественная организация &quot;Асаркьа&quot;</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col">
            {load && <Loading />}
            {text} {!load && <PostsMobile posts={posts} />}
          </div>
        </div>
      </div>
    </>
  );
};

Mobile.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutMobile>{page}</LayoutMobile>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const userAgent = ctx.req.headers['user-agent'];
  const isMobile = /mobile/i.test(userAgent)
  if(!isMobile) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const { posts, loading }: any =
    await new PostService().getPostsOnHeadPageForMobile();
  return {
    props: {
      posts,
      loading,
    },
  };
};

export default Mobile;
