import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './LayoutMobile.module.scss';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: React.ReactNode
}
export default function LayoutMobile({children}:LayoutProps) {
  const menu = [
    { path: '/mobile', name: 'Главная' },
    { path: '/mobile/civil', name: 'Гражданские инициативы' },
    { path: '/mobile/culture', name: 'Культура и общество' },
    { path: '/mobile/blog', name: 'Блог' },
  ];
  const router = useRouter();
  const [menuMobile, setMenuMobile] = useState(true);
  const [menuSocNet, setMenuSocNet] = useState(true);
  const [landscape, setLandscape] = useState(true);
  useEffect(() => {
    setLandscape(window.matchMedia('(orientation: landscape)').matches);
    window
      .matchMedia('(orientation: landscape)')
      .addEventListener('change', (e) => setLandscape(e.matches));
  }, []);

  const menuItem = menu.map((item, index) => {
    return (
      <Link
        style={{ padding: '10px 0' }}
        onClick={() => setMenuMobile(true)}
        href={item.path==='/mobile' ? '/mobile' : `${item.path}/1`}
        key={index}
        prefetch={false}
        className={
          router.pathname === item.path ||
          router.pathname === item.path + '/[id]'
            ? `${styles.active}`
            : ''
        }
      >
        {item.name}
      </Link>
    );
  });
  const asarkia = {
    facebook: 'https://www.facebook.com/asarkia.info',
    instagram: 'https://www.instagram.com/asarkia',
    VK: 'https://vk.com/asarkia',
    telegramm: 'https://t.me/asarkia',
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div
              className={`${styles.menu} d-flex justify-content-between`}
              style={{ position: 'relative' }}
            >
              {menuMobile ? (
                <div
                  className={styles.menumobile}
                  onClick={() => {
                    setMenuSocNet(true);
                    setMenuMobile(!menuMobile);
                  }}
                >
                  &equiv;
                </div>
              ) : (
                <div
                  className={styles.menumobile}
                  onClick={() => {
                    setMenuSocNet(true);
                    setMenuMobile(!menuMobile);
                  }}
                >
                  &times;
                </div>
              )}
              <div
                className={
                  'd-flex align-items-center text-center justify-content-end'
                }
                style={{
                  cursor: 'pointer',
                  width: landscape ? '25%' : '35%',
                  textAlign: 'center',
                  color: '#fff',
                }}
                onClick={() => {
                  setMenuMobile(true);
                  setMenuSocNet(!menuSocNet);
                }}
              >
                Соц Сети{' '}
                <span style={{ fontSize: 24 }}>
                  {' '}
                  {menuSocNet ? (
                    <div>&nbsp; &equiv;</div>
                  ) : (
                    <div>&nbsp; &times;</div>
                  )}
                </span>
              </div>
            </div>
            <div className="col-6">
              {!menuMobile ? (
                <div className={styles.wrapper}>{menuItem}</div>
              ) : null}
            </div>
            <div className="d-flex justify-content-end">
              {!menuSocNet && (
                <div className={`${styles.wrapper} d-flex flex-column`}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={asarkia.facebook}
                    style={{ fontSize: 20 }}
                  >
                    Facebook
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={asarkia.instagram}
                    style={{ fontSize: 20 }}
                  >
                    Instagram
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={asarkia.VK}
                    style={{ fontSize: 20 }}
                  >
                    VK
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={asarkia.telegramm}
                    style={{ fontSize: 20 }}
                  >
                    Telegramm
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
}
