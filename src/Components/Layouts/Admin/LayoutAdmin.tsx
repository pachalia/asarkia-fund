import logo from './../../../public/images/logo.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './LayoutAdmin.module.scss'
import { useEffect, useState } from 'react'
import { AuthService } from '../../../services/auth.service'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Image from 'next/image'

type LayoutProps = {
  children: React.ReactNode
}
export default function LayoutAdmin({children}:LayoutProps){
  const router = useRouter()
  const [guard, setGuard] = useState(false)
  const [token, setToken] = useState('')
  useEffect(()=>{
    setToken(localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN))
  })
  const httpLink=createHttpLink({
    uri: 'https://andreypachalia.ru/api',
  });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  useEffect(()=>{
    const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)
    if (!token) {
      router.push('/admin/login')
    }else {
    new AuthService().currentUser(token).subscribe({
      next: (res) => {
        setGuard(true)
        setTimeout(()=> {
          logout()
        }, +res.data.currentUser.expIn)
      },
      error: () => router.push('/admin/login')
    })
    }
  }, [token])

  const logout = () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN)
    router.push('/admin/login')
  }

  const menu = [
    { path: '/admin', name: 'Главная' },
    { path: '/admin/create-post', name: 'Создать пост' },
    { path: '/admin/mail', name: 'Отправить письмо' }
  ];
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
      <ApolloProvider client={client}>
      {guard && (
        <>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <div className='d-flex justify-content-around align-items-center'>
                  <div className='logo'>
                    <Image src={logo} alt={'logo'}/>
                  </div>
                  <div className={`${styles.menu} d-flex justify-content-around w-100`}>
                    {menuItem}
                    <button onClick={logout} style={{
                      fontFamily: 'Montserrat700',
                      textTransform: 'uppercase',
                      fontSize:24,
                      color: '#fff',
                      background: 'transparent',
                      borderColor: 'transparent'}}>Выйти</button>
                  </div>
                  <div className='logo'>
                    <Image src={logo} alt={'logo'}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <main>{children}</main>
        </>
      )}
      </ApolloProvider>
    </>
  )
}