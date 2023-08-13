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
import PaginationMobile from "../../Components/Pagination/Pagination.mobile";

const Civil: NextPageWithLayout<{
    posts: Post[];
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
                    Гражданские инициативы | Общественная организация &quot;Асаркьа&quot;
                </title>
                <meta
                    name="description"
                    content={`Общественная телестудия "Асаркьа": Гражданские инициативы в Абхазии.`}
                />
            </Head>
            {loadin && <Loading />}
            {!loadin && <Posts posts={posts} totalCount={totalCount} />}
            {!loadin && Math.ceil(totalCount / 3) > 1 && landscape && (
                <Pagination
                    pages={Math.ceil(totalCount/3)}
                    link={'/civil'}
                    loading={load}
                />
            )}
            {!loadin && Math.ceil(totalCount/3)>1 && !landscape && (
                <PaginationMobile pages={Math.ceil(totalCount/3)} link={'/civil'} loading={load}/>
            )}
        </>
    );
};

Civil.getLayout = function getLayout(page: ReactElement) {
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
                destination: `/mobile/civil/1`,
                permanent: false
            }
        }
    }
    const { posts, loading, totalCount }: any =
        await new PostService().getPostsByType('2', 3, (+id - 1) * 3);
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
export default Civil;
