import { NextPage } from 'next';
import Link from 'next/link';
import styles from './Posts.module.scss';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Post } from '../../models/posts.model';
import Image from 'next/image';

const Posts: NextPage<{ posts: Post[]; totalCount?: number }> = ({posts, totalCount,}) => {
  const router = useRouter();
  const [landscape, setLandscape] = useState(true);
  useEffect(() => {
    setLandscape(window.matchMedia('(orientation: landscape)').matches);
    window
        .matchMedia('(orientation: landscape)')
        .addEventListener('change', (e) => setLandscape(e.matches));
  }, []);

  const [isMinWidth1400, setIsMinWidth1400] = useState(true);
  useEffect(() => {
    setIsMinWidth1400(window.matchMedia('(min-width: 1400px)').matches);
    window
        .matchMedia('(min-width: 1400px)')
        .addEventListener('change', (e) => setIsMinWidth1400(e.matches));
  }, []);


  const [orientation, setOrientation] = useState(null);
  useEffect(() => {
    if (landscape && isMinWidth1400) {
      setOrientation('col-8');
    }
    if (landscape && !isMinWidth1400) {
      setOrientation('col-12');
    }
    if (!landscape) {
      setOrientation('col-24');
    }
  }, [isMinWidth1400, landscape]);

  return (
      <>
        {posts ? (
            <div className="container">
              <div className="row justify-content-center">
                {totalCount === 0 && (
                    <div
                        className="col text-center"
                        style={{
                          fontFamily: 'Montserrat700',
                          fontSize: 32,
                          marginTop: 20,
                        }}
                    >
                      Постов нет
                    </div>
                )}
                {posts.map((value, index) => {
                  return (
                      <div className={orientation} key={index}>
                        <div
                            className={`${styles.card} ${
                                router.pathname !== '/' ? styles.post_margin : ''
                            } d-flex flex-column`}
                            style={{ marginBottom: 20 }}
                        >
                          <div>
                            <p
                                style={{ paddingTop: '10px' }}
                                className="d-flex justify-content-end date"
                            >
                              {value.created_at}
                            </p>
                            {landscape && value.small_image && (
                                <Link
                                    href={`/post/${value.id}`}
                                    style={{ textDecoration: 'none' }}
                                    className={'d-flex align-items-center'}
                                >
                                  <div
                                      className="col-9"
                                      style={{ position: 'relative', height: 100 }}
                                  >
                                    <Image
                                        src={value.small_image}
                                        alt=""
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                  </div>
                                  <div className={'col-15'}>
                                    <h1
                                        className={`${styles.h1} card-title text-center`}
                                    >
                                      {value.title}
                                    </h1>
                                  </div>
                                </Link>
                            )}
                            {landscape && !value.small_image && (
                                <Link
                                    href={`/post/${value.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                  <div className={'col-24'}>
                                    <h1
                                        className={`${styles.h1} card-title text-center`}
                                    >
                                      {value.title}
                                    </h1>
                                  </div>
                                </Link>
                            )}
                            {!landscape && value.small_image && (
                                <Link
                                    href={`/post/${value.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                  <div className={'col-24'}>
                                    <h1
                                        className={`${styles.h1} card-title text-center`}
                                    >
                                      {value.title}
                                    </h1>
                                  </div>
                                  <div
                                      className="col-24"
                                      style={{ position: 'relative', height: 100 }}
                                  >
                                    <Image
                                        src={value.small_image}
                                        alt=""
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                  </div>
                                </Link>
                            )}
                            {!landscape && !value.small_image && (
                                <Link
                                    href={`/post/${value.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                  <div className={'col-24'}>
                                    <h1
                                        className={`${styles.h1} card-title text-center`}
                                    >
                                      {value.title}
                                    </h1>
                                  </div>
                                </Link>
                            )}
                          </div>

                          <div className="ql-container ql-bubble ql-disabled">
                            <div
                                className="ql-editor"
                                style={{ overflowY: 'hidden' }}
                            >
                              {router.pathname === '/' ? (
                                  <noindex>
                                    <div
                                        dangerouslySetInnerHTML={{
                                          __html: value.pre_post,
                                        }}
                                    />
                                  </noindex>
                              ) : (
                                  <div
                                      dangerouslySetInnerHTML={{
                                        __html: value.pre_post,
                                      }}
                                  />
                              )}
                            </div>
                          </div>
                          <Link href={`/post/${value.id}`}>
                            <button className="btn btn-primary d-block m-auto">
                              Подробнее
                            </button>
                          </Link>
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
        ) : (
            <h1>Постов нет</h1>
        )}
      </>
  );
};

export default Posts;
