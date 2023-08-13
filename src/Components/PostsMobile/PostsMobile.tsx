import { NextPage } from 'next';
import { PostForMobile } from '../../models/posts.model';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/mobile.module.scss';
import Link from 'next/link';

const PostsMobile: NextPage<{
  posts: PostForMobile[];
  totalCount?: number;
}> = ({ posts, totalCount }) => {
  const [landscape, setLandscape] = useState(true);
  useEffect(() => {
    setLandscape(window.matchMedia('(orientation: landscape)').matches);
    window
      .matchMedia('(orientation: landscape)')
      .addEventListener('change', (e) => setLandscape(e.matches));
  }, []);
  return (
    <>
      {totalCount === 0 && (
        <h1
          className="text-center"
          style={{
            fontFamily: 'Montserrat700',
            fontSize: 32,
            marginTop: 20,
          }}
        >
          Постов нет
        </h1>
      )}
      {posts.map(({ id, title, post_type, created_at }, index) => {
        return (
          <div
            className={`${styles.card}`}
            style={{ position: 'static', border: '1px solid black' }}
            key={index}
          >
            <div
              className={'d-flex justify-content-between'}
              style={{ width: '100%' }}
            >
              <p>{post_type}</p>
              <p>
                {created_at}
              </p>
            </div>
            <Link
              style={{
                fontSize: landscape ? '18px' : '14px',
                position: 'relative',
                display: 'block',
              }}
              className={'text-center'}
              href={`/mobile/post/${id}`}
            >
              {title}
            </Link>
          </div>
        );
      })}
    </>
  );
};
export default PostsMobile;
