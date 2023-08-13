import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ru">
            <Head>
                <link rel="apple-touch-icon" type="image/png" sizes="180x180"  href="/favicon/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32"  href="/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16"  href="/favicon/favicon-16x16.png"/>
                <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico"/>
            </Head>
            <body>
            <Main />
            <NextScript />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                      m[i].l=1*new Date();
                      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                   ym(89826871, "init", {
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true
                   });
                `,
              }}
            />
            <noscript>
                <div>
                    <img src="https://mc.yandex.ru/watch/89826871" style={{position: 'absolute', left:'-9999px'}} alt="" />
                </div>
            </noscript>
            </body>
        </Html>
    )
}