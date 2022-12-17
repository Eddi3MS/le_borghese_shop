import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  ProductPrice,
  Button,
} from '../../styles/ProductDetails'
import { GET_PRODUCT_QUERY } from '../../lib/query'
import { useQuery } from 'urql'
import { useRouter } from 'next/router'
import { useStateContext } from '../../lib/context'
import { useToast } from '@ems-ignite/react'
import { useCallback, useEffect } from 'react'
import { MinusCircle, PlusCircle } from 'phosphor-react'
import formatMoney from '../../lib/formatMoney'
import { motion } from 'framer-motion'
import { card, cards } from '..'

export default function ProductDetails() {
  //Use state
  const { increaseQty, decreaseQty, qty, onAdd, setQty } = useStateContext()

  const resetQuantity = useCallback(() => {
    setQty(1)
  }, [setQty])

  useEffect(() => {
    resetQuantity()
  }, [resetQuantity])

  const { toast } = useToast()

  //Fetch slug
  const { query } = useRouter()
  //Fetch Graphql data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  })
  const { data, fetching, error } = results
  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  //Extract Data
  const { title, description, image, price } = data.products.data[0].attributes

  //Create Toast
  const notify = () => {
    toast({ title: 'Sucesso!', content: `${title} adicionado ao carrinho.` })
  }

  return (
    <DetailsStyle layout variants={cards} initial='hidden' animate='show'>
      <motion.img
        layout
        variants={card}
        src={image.data.attributes.formats.medium.url}
        alt={title}
      />
      <ProductInfo layout variants={card}>
        <h2>{title}</h2>
        <p>{description}</p>
        <ProductPrice>
          Valor Unitário: <span>{formatMoney(price)}</span>
        </ProductPrice>
        <Quantity>
          <span>Quantidade</span>
          <button onClick={decreaseQty}>
            <MinusCircle size={32} />
          </button>
          <p>{qty}</p>
          <button onClick={increaseQty}>
            <PlusCircle size={32} />
          </button>
        </Quantity>

        <Button
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty)
            notify()
          }}
        >
          Adicionar ao Carrinho
        </Button>
      </ProductInfo>
    </DetailsStyle>
  )
}
