import { Analytics } from '@vercel/analytics/react'
import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import Login from '@/components/Login/Login'
import ColumnLayout from '@/components/Layouts/ColumnLayout'
import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout'
import PageTransition from '@/components/PageTransition/PageTransition'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // const router = useRouter()

  return (
    <>
      <SessionProvider session={session}>
        <Login />
        <Component
          {...pageProps}
        // key={router.asPath}
        />
        <Analytics />
      </SessionProvider>
    </>
  )
}
