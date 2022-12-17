import '../styles/globals.css'
import { createClient, Provider } from 'urql'
import Nav from '../components/Nav'
import { StateContext } from '../lib/context'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ToastProvider } from '@ems-ignite/react'

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API })

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <ToastProvider position='top-center' duration={1500}>
            <Nav />
            <Component {...pageProps} />
          </ToastProvider>
        </Provider>
      </StateContext>
    </UserProvider>
  )
}

export default MyApp
