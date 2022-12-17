import { useRouter } from 'next/router'
import formatMoney from '../lib/formatMoney'
import { Button } from '../styles/ProductDetails'
import { useMemo } from 'react'
import {
  Address,
  Card,
  GeneralInfo,
  InfoWrapper,
  OrderInfo,
  TotalInfo,
  Wrapper,
} from '../styles/Success'
// STRIPE_SECRET_KEY
const stripe = require('stripe')(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ['line_items'],
    }
  )

  return { props: { order } }
}

export default function Success({ order }) {
  console.log('🚀 ~ file: success.js:29 ~ Success ~ order', order)
  const route = useRouter()

  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.75 } }}
        initial={{ opacity: 0, scale: 0.75 }}
      >
        <h1>Obrigado por comprar com a gente!</h1>
        <h2>Um e-mail de confirmação foi enviado para:</h2>
        <h2>{order.customer_details.email}</h2>
        <InfoWrapper>
          <Address>
            <h3>Endereço:</h3>

            <GeneralInfo>
              Endereço:{' '}
              <span>{`${order.shipping_details.address.line1}, ${order.shipping_details.address.line2}`}</span>
            </GeneralInfo>
            <GeneralInfo>
              Cidade: <span>{order.shipping_details.address.city}</span>
            </GeneralInfo>
            <GeneralInfo>
              Estado: <span>{order.shipping_details.address.state}</span>
            </GeneralInfo>
            <GeneralInfo>
              CEP: <span>{order.shipping_details.address.postal_code}</span>
            </GeneralInfo>
          </Address>
          <OrderInfo>
            <h3>Produtos:</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <GeneralInfo>
                  Produto: <span>{item.description}</span>
                </GeneralInfo>
                <GeneralInfo>
                  Quantidade: <span>{item.quantity}</span>
                </GeneralInfo>
                <GeneralInfo>
                  Valor Unitário:{' '}
                  <span>{formatMoney(item.price.unit_amount / 100)}</span>
                </GeneralInfo>
              </div>
            ))}

            <GeneralInfo>
              Taxa de entrega:{' '}
              <span>{formatMoney(order.shipping_cost.amount_total / 100)}</span>
            </GeneralInfo>

            <TotalInfo>
              Total: <span>{formatMoney(order.amount_total / 100)}</span>
            </TotalInfo>
          </OrderInfo>
        </InfoWrapper>
        <Button onClick={() => route.push('/')}>Continue Comprando</Button>
      </Card>
    </Wrapper>
  )
}
