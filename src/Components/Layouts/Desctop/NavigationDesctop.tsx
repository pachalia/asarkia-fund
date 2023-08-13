import Link from 'next/link';
import styles from './NavigationDesctop.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function NavigationDesctop() {
  const menu = [
    { path: '/', name: 'Главная' },
    { path: '/civil', name: 'Гражданские инициативы' },
    { path: '/culture', name: 'Культура и общество' },
    { path: '/blog', name: 'Блог' },
  ];
  const asarkia = {
    facebook: 'https://www.facebook.com/asarkia.info',
    instagram: 'https://www.instagram.com/asarkia',
    VK: 'https://vk.com/asarkia',
    telegramm: 'https://t.me/asarkia',
  };
  const [menuMobile, setMenuMobile] = useState(true);
  const [menuSocNet, setMenuSocNet] = useState(true);
  const router = useRouter();
  const [matches, setMatches] = useState(true);
  useEffect(() => {
    setMatches(window.matchMedia('(min-width: 768px)').matches);
    window
      .matchMedia('(min-width: 768px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  const menuSocNetView = (
    <div
      className={'d-flex align-items-center text-center justify-content-end'}
      style={{ cursor: 'pointer', textAlign: 'center', color: '#fff' }}
      onClick={() => {
        setMenuMobile(true);
        setMenuSocNet(!menuSocNet);
      }}
    >
      Соц Сети{' '}
      <span style={{ fontSize: 24 }}>
        {' '}
        {menuSocNet ? <div>&nbsp; &equiv;</div> : <div>&nbsp; &times;</div>}
      </span>
    </div>
  );

  const menuMobileView = (
    <div
      className={styles.menumobile}
      onClick={() => {
        setMenuSocNet(true);
        setMenuMobile(!menuMobile);
      }}
    >
      <div
        style={{ color: '#fff', fontSize: 24, fontFamily: 'Montserrat700' }}
        className={'d-flex'}
      >
        Меню
      </div>
      {menuMobile ? (
        <div style={{ color: '#fff', fontSize: 24 }}>&nbsp; &equiv;</div>
      ) : (
        <div style={{ color: '#fff', fontSize: 24 }}>&nbsp; &times;</div>
      )}
    </div>
  );

  const menuItem = menu.map((item, index) => {
    return (
      <Link
        href={item.path === '/' ? '/' : `${item.path}/1`}
        key={index}
        prefetch={false}
        className={
          router.pathname === `${item.path}/[id]` || router.pathname===item.path
            ? `${styles.active}`
            : ''
        }
      >
        {item.name}
      </Link>
    );
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className={`${styles.menu} d-flex justify-content-between`}>
              {!matches && menuMobileView}
              {!matches && menuSocNetView}
              {matches && (
                <div
                  className={'d-flex justify-content-between'}
                  style={{ width: '100%' }}
                >
                  {menuItem}
                </div>
              )}
            </div>
            {!matches && !menuMobile && (
              <div className={styles.wrapper}>{menuItem}</div>
            )}
            <div className={'d-flex justify-content-end'}>
              {!matches && !menuSocNet && (
                <div
                  className={styles.wrapper}
                  style={{ position: 'absolute' }}
                >
                  <a
                    target="_blank"
                    href={asarkia.facebook}
                    style={{ fontSize: 20 }}
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                  <a
                    target="_blank"
                    href={asarkia.instagram}
                    style={{ fontSize: 20 }}
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                  <a
                    target="_blank"
                    href={asarkia.VK}
                    style={{ fontSize: 20 }}
                    rel="noreferrer"
                  >
                    VK
                  </a>
                  <a
                    target="_blank"
                    href={asarkia.telegramm}
                    style={{ fontSize: 20 }}
                    rel="noreferrer"
                  >
                    Telegramm
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
