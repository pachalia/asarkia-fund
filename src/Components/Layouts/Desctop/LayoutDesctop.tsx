import React, { useEffect, useState } from 'react';
import styles from './LayoutDesctop.module.scss';
import Link from 'next/link';
import NavigationDesctop from './NavigationDesctop';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import fb from '../../../public/images/facebook.png';
import ig from '../../../public/images/ig.png';
import vk from '../../../public/images/vkontakte.png';
import telegram from '../../../public/images/telegramm.png';

type LayoutProps = {
  children: React.ReactNode
}

export default function LayoutDesktop({children}:LayoutProps) {
  const asarkia = {
    facebook: 'https://www.facebook.com/asarkia.info',
    instagram: 'https://www.instagram.com/asarkia',
    VK: 'https://vk.com/asarkia',
    telegramm: 'https://t.me/asarkia',
  };
  const [matches, setMatches] = useState(true);
  useEffect(() => {
    setMatches(window.matchMedia('(min-width: 768px)').matches);
    window
      .matchMedia('(min-width: 768px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  const socNet = (
    <div className="col-md-8 col-24 d-flex align-items-center justify-content-end">
      <div className="col-xxl-14 col-xl-18 col-lg-20 col-md-24 col-sm-14 col-18">
        <div className={`${styles.socnet} d-flex justify-content-between`}>
          <Link target="_blank" href={asarkia.facebook} className={styles.fb}>
            <Image src={fb} alt="facebook" />
          </Link>
          <Link target="_blank" href={asarkia.instagram} className={styles.ig}>
            <Image src={ig} alt="instagram" />
          </Link>
          <Link target="_blank" href={asarkia.VK} className={styles.vk}>
            <Image src={vk} alt="vkontakte" />
          </Link>
          <Link target="_blank" href={asarkia.telegramm} className={styles.tg}>
            <Image src={telegram} alt="telegramm" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.nav}>
        <div className="container">
          <div className="row justufy-content-between align-items-center">
            <div className="col-6">
              <Link href="/" style={{ zIndex: 9, position: 'relative' }}>
                <Image src={logo} alt="logo" />
              </Link>
            </div>
            <div className="col-18 col-md-10">
              <div className={styles.fond}>
                <Link
                  href="/"
                  style={{
                    textTransform: 'uppercase',
                    zIndex: 9,
                    color: '#fff',
                    position: 'relative',
                  }}
                >
                  Общественная организация
                </Link>
              </div>
            </div>
            {matches && socNet}
          </div>
        </div>
      </div>
      <NavigationDesctop></NavigationDesctop>
      <main>{children}</main>
    </>
  );
}
