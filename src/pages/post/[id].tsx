import {GetServerSideProps, GetServerSidePropsContext, GetStaticProps} from 'next'
import { PostService } from '../../services/post.service'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import { PostDetail } from '../../models/posts.model'
import Loading from '../../Components/Loading/Loading'
import LayoutDesktop from '../../Components/Layouts/Desctop/LayoutDesctop'
import { NextPageWithLayout } from '../_app'
import Image from 'next/image'

const PostPage: NextPageWithLayout<{ post: PostDetail; loading: boolean }> = ({
  post,
  loading,
}) => {
  const [load, setLoad] = useState(loading);

  useEffect(() => {
    if (post) {
      setLoad(false);
    }
  }, [post]);
  const router = useRouter();
  const [landscape, setLandscape] = useState(true);
  useEffect(() => {
    setLandscape(window.matchMedia('(orientation: landscape)').matches);
    window
      .matchMedia('(orientation: landscape)')
      .addEventListener('change', (e) => setLandscape(e.matches));
  }, []);
  const title = (
    <div className="d-flex align-items-center" style={{ marginTop: 0 }}>
      {post.image && (
        <div className={'col-9'} style={{ position: 'relative', height: 400 }}>
          <Image
            src={`https://andreypachalia.ru/static/${post.image}`}
            fill
            alt=""
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}
      <div className={post.image ? 'col-15' : 'col-24'}>
        <h1
          className="text-center"
          style={{
            fontSize: landscape ? '2.3rem' : '1.1rem',
          }}
        >
          {post.title}
        </h1>
      </div>
    </div>
  );
  const page = (
    <div className="container">
      <div className="row">
        <div className="col">
          {!landscape ? (
            <div style={{ marginTop: !landscape ? 20 : 'inherit' }}>
              <h1
                className={'text-center'}
                style={{
                  fontSize: landscape ? '2.3rem' : '1.1rem',
                }}
              >
                {post.title}
              </h1>
              {post.image ? (
                <div
                  style={{
                    position: 'relative',
                    width: landscape ? 400 : 250,
                    height: landscape ? 400 : 250,
                    margin: '0 auto',
                  }}
                >
                  <Image
                    src={`https://andreypachalia.ru/static/${post.image}`}
                    alt=""
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            title
          )}
          <div className="card-body">
            <div className="ql-container ql-bubble ql-disabled">
              <div
                className="ql-editor"
                style={{
                  overflowY: 'hidden',
                  fontSize: !landscape ? '10px' : 'inherit',
                }}
                data-gramm={'false'}
              >
                <div dangerouslySetInnerHTML={{ __html: post.post }} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary"
              style={{ marginBottom: 30, zIndex: 9, position: 'relative' }}
              onClick={router.back}
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Head>
        <title>{`${post.title} | Общественная организация "Асаркьа"`}</title>
      </Head>
      {load && <Loading />}
      {!load && page}
    </>
  );
};

PostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutDesktop>{page}</LayoutDesktop>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.params.id
  if (isNaN(Number(id))) {
    return { notFound: true };
  }
  const userAgent = ctx.req.headers['user-agent'];
  const isMobile = /mobile/i.test(userAgent)
  if(isMobile) {
    return {
      redirect: {
        destination: `/mobile/post/${id}`,
        permanent: false
      }
    }
  }
  const { post, loading }: any = await new PostService().getPostById(+id);
  return {
    props: {
      post,
      loading,
    },
  };
};

export default PostPage;
