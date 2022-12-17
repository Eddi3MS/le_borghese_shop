import Head from 'next/head'
import { PRODUCT_QUERY } from '../lib/query'
import { useQuery } from 'urql'
import Product from '../components/Product'
import { Gallery } from '../styles/Gallery'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
}

export const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.1 },
  },
}

export default function Home() {
  //Fetch products from strapi
  const [results] = useQuery({ query: PRODUCT_QUERY })
  const { data, fetching, error } = results

  //Checks for the data coming in
  // if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  const products = data?.products?.data

  return (
    <div>
      <Head>
        <title>Le Borghese</title>
        <meta name='description' content='Le Borghese, the best there is.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Gallery layout variants={cards} initial='hidden' animate='show'>
          {fetching && <Skeleton />}
          {products &&
            products?.map((product) => (
              <Product
                key={product.attributes.slug}
                product={product}
                layout
                variants={card}
              />
            ))}
        </Gallery>
      </main>
    </div>
  )
}
