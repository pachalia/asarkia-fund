import {GetServerSideProps, GetServerSidePropsContext, GetStaticProps} from 'next'
import { PostService } from '../../services/post.service'
import React, { ReactElement, useEffect, useState } from 'react'
import LayoutDesktop from '../../Components/Layouts/Desctop/LayoutDesctop'
import { NextPageWithLayout } from '../_app'
import { Post } from '../../models/posts.model'
import Head from 'next/head'
import Loading from '../../Components/Loading/Loading'
import Posts from '../../Components/Posts/Posts'
import Pagination from '../../Components/Pagination/Pagination'

const Blog: NextPageWithLayout<{
  posts: Post[];
  totalCount: number;
  loading: boolean;
}> = ({ posts, totalCount, loading }) => {
  const [loadin, setLoadin] = useState(loading);
  const load = (data: boolean) => {
    setLoadin(data);
  };
  useEffect(() => {
    if (posts) {
      setLoadin(false);
    }
  }, [posts]);
  return (
    <>
      <Head>
        <title>
          Блог Надежды Венедиктовой | Общественная организация
          &quot;Асаркьа&quot;
        </title>
        <meta
          name="description"
          content={`Надежда Венедиктова, Блог Надежды Венедиктовой, Абхазия, Блог`}
        />
      </Head>
      {loadin && <Loading />}
      {!loadin && <Posts posts={posts} totalCount={totalCount} />}
      {!loadin && Math.ceil(totalCount / 3) > 1 && (
        <Pagination
          pages={Math.ceil(totalCount / 3)}
          link={'/blog'}
          loading={load}
        />
      )}
    </>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutDesktop>{page}</LayoutDesktop>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.params.id;
  if (isNaN(Number(id))) {
    return { notFound: true };
  }
  const userAgent = ctx.req.headers['user-agent'];
  const isMobile = /mobile/i.test(userAgent)
  if(isMobile) {
    return {
      redirect: {
        destination: `/mobile/blog/1`,
        permanent: false
      }
    }
  }
  const { posts, loading, totalCount }: any =
    await new PostService().getPostsByType('1', 3, (+id - 1) * 3);
  if (+id > Math.ceil(totalCount / 3)) {
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
export default Blog;
