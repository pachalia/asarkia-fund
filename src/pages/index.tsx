import {GetServerSideProps, GetServerSidePropsContext} from 'next';
import {PostService} from '../services/post.service';
import React, {ReactElement, useEffect, useState} from 'react';
import Head from 'next/head';
import Posts from '../Components/Posts/Posts';
import {Post} from '../models/posts.model';
import {NextPageWithLayout} from './_app';
import LayoutDesktop from '../Components/Layouts/Desctop/LayoutDesctop';

interface Props {
    userAgent?: string;
}


const Home: NextPageWithLayout<{
    posts: Post[];
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
    const page = (
        <div className="container">
            <div className="row">
                <div className="col-24">
                    <div className="fond_text">
                        <p
                            style={{
                                fontFamily: 'Montserrat400',

                                fontSize: !landscape ? '0.8rem' : 'inherit',
                            }}
                        >
              <span style={{ fontFamily: 'Montserrat700' }}>
                Фонд «Асаркьа»{' '}
              </span>
                            создан в 2010 году для информационной поддержки различных
                            гражданских инициатив, направленных на развитие и укрепление
                            демократических институтов в Абхазии. В фокусе нашей работы
                            поддержка проектов экологической направленности, разработка
                            механизмов по соблюдению и защите прав женщин, сохранение
                            мультикультурной среды в Абхазии. Наша цель – правовое, гуманное
                            общество, в котором защищены интересы всех наших граждан!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <>
            <Head>
                <title>Главная | Общественная организация &quot;Асаркьа&quot;</title>
            </Head>
            {page}
            {!load && <Posts posts={posts} />}
        </>
    );
};


Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutDesktop>{page}</LayoutDesktop>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const userAgent = ctx.req.headers['user-agent'];
    const isMobile = /mobile/i.test(userAgent)
    if(isMobile) {
        return {
            redirect: {
                destination: '/mobile',
                permanent: false
            }
        }
    }
    const { posts, loading }: any = await new PostService().getPostsOnHeadPage();
    return {
        props: {
            posts,
            loading,
        },
    };
};

export default Home;
