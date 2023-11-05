import { Analytics } from '@vercel/analytics/react'
import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import Login from '@/components/Login/Login'
import ColumnLayout from '@/components/Layouts/ColumnLayout'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // const router = useRouter()

  return (
    <>
      <SessionProvider session={session}>
        <ColumnLayout>
          <Login />
          <Component
            {...pageProps}
          // key={router.asPath}
          />
          <Analytics />
        </ColumnLayout>
      </SessionProvider>
    </>
  )
}
