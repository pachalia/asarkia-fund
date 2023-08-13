import {GetServerSideProps, GetServerSidePropsContext, GetStaticProps} from 'next'
import { PostService } from '../../../services/post.service'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import { PostMobileDetail } from '../../../models/posts.model'
import Loading from '../../../Components/Loading/Loading'
import LayoutMobile from '../../../Components/Layouts/Mobile/LayoutMobile'
import { NextPageWithLayout } from '../../_app'
import Image from 'next/image'

const PostMobilePage: NextPageWithLayout<{ post: PostMobileDetail; loading: boolean }> = ({post,loading,}) => {
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

  return (
    <>
      <Head>
        <title>{`${post.title} | Общественная организация "Асаркьа"`}</title>
      </Head>
      {load && <Loading />}
      {!load && (<div className={'container'}>
        <div className='row'>
          <div className='col-24'>
            <h1 className='text-center' style={{fontSize: !landscape ? '1.5rem': '2.5rem'}}>{post.title}</h1>
          </div>
          <div className='col-24'>
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
                  <div dangerouslySetInnerHTML={{ __html: post.post_for_mobile }} />
                </div>
              </div>
            </div>
          </div>
          <div className='col-24 d-flex justify-content-center'>
            <button
              className="btn btn-primary"
              style={{ marginBottom: 30, zIndex: 9, position: 'relative' }}
              onClick={router.back}
            >
              Назад
            </button>
          </div>
        </div>
      </div>)}
    </>
  );
};

PostMobilePage.getLayout = function getLayout(page: ReactElement) {
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
        destination: `/post/${id}`,
        permanent: false
      }
    }
  }
  const { post, loading }: any = await new PostService().getPostByIdMobile(+id);
  return {
    props: {
      post,
      loading,
    },
  };
};

export default PostMobilePage;
