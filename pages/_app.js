import '../styles/globals.css'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Layout.module.css'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // 地图页面不包裹全局布局
  if (router.pathname === '/map') {
    return <Component {...pageProps} />
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  )
}

export default MyApp 