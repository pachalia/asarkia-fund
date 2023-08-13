import React, { ReactElement, useEffect, useState } from 'react'
import LayoutMobile from '../../../Components/Layouts/Mobile/LayoutMobile'
import { NextPageWithLayout } from '../../_app'
import { PostForMobile } from '../../../models/posts.model'
import {GetServerSideProps, GetServerSidePropsContext, GetStaticProps} from 'next'
import { PostService } from '../../../services/post.service'
import PostsMobile from '../../../Components/PostsMobile/PostsMobile'
import Pagination from '../../../Components/Pagination/Pagination'
import Loading from '../../../Components/Loading/Loading'
import Head from 'next/head'
import PaginationMobile from "../../../Components/Pagination/Pagination.mobile";

const CultureMobile: NextPageWithLayout<{
  posts: PostForMobile[];
  totalCount: number;
  loading: boolean;
}> = ({ posts, totalCount, loading }) => {
  const [loadin, setLoadin] = useState(loading);
  const load = (data: boolean) => {
    setLoadin(data);
  };
  const [landscape, setLandscape] = useState(true);
  useEffect(() => {
    setLandscape(window.matchMedia('(orientation: landscape)').matches);
    window
        .matchMedia('(orientation: landscape)')
        .addEventListener('change', (e) => setLandscape(e.matches));
    if (posts) {
      setLoadin(false);
    }
  }, [posts]);
  return (
    <>
      <Head>
        <title>
          Культура и общество | Общественная организация &quot;Асаркьа&quot;
        </title>
        <meta
          name="description"
          content={`Общественная телестудия "Асаркьа": Культура и общество в Абхазии.`}
        />
      </Head>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className={'text-center'}>Культура и общество</h1>
            {loadin && <Loading />}
            {!loadin && <PostsMobile posts={posts} totalCount={totalCount} />}
            {!loadin && Math.ceil(totalCount / 10) > 1 && landscape && (
              <Pagination
                pages={Math.ceil(totalCount / 10)}
                link={'/mobile/culture'}
                loading={load}
              />
            )}
            {!loadin && Math.ceil(totalCount / 10) > 1 && !landscape && (
                <PaginationMobile
                    pages={Math.ceil(totalCount / 10)}
                    link={'/mobile/culture'}
                    loading={load}
                />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

CultureMobile.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutMobile>{page}</LayoutMobile>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx:GetServerSidePropsContext) => {
  const id = ctx.params.id
  if (isNaN(Number(id))) {
    return { notFound: true };
  }
  const userAgent = ctx.req.headers['user-agent'];
  const isMobile = /mobile/i.test(userAgent)
  if(!isMobile) {
    return {
      redirect: {
        destination: `/culture/1`,
        permanent: false
      }
    }
  }
  const { posts, loading, totalCount }: any =
    await new PostService().getMobilePostsByType('3', 10, (+id - 1) * 10);
  if (+id > Math.ceil(totalCount / 10)) {
    return { notFound: true };
  }
  return {
    props: {
      posts,
      loading,
      totalCount,
    },
  };
};
export default CultureMobile;
