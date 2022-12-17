import { useRouter } from 'next/router'
// Specify Stripe secret api key here
const stripe = require('stripe')(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0'
import styled from 'styled-components'
import formatMoney from '../lib/formatMoney'
import { Button } from '../styles/ProductDetails'

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    // access the user session
    const session = getSession(ctx.req, ctx.res)

    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`]

    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    })
    return { props: { orders: paymentIntents.data } }
  },
})

export default function Profile({ user, orders }) {
  const route = useRouter()

  return user ? (
    <div>
      <User>
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <Button onClick={() => route.push('/api/auth/logout')}>Log out</Button>
      </User>

      <div>
        {orders.map((order) => (
          <Order key={order.id}>
            <div>
              <h1>Order ID: {order.id}</h1>
              <h2>{formatMoney(order.amount / 100)}</h2>
            </div>

            <div>
              {order.receipt_email ? (
                <h1>Receipt Email {order.receipt_email}</h1>
              ) : null}
            </div>
          </Order>
        ))}
      </div>
    </div>
  ) : null
}

const Order = styled.div`
  background: white;
  margin: 2rem 0rem;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 1rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 1rem;
    color: var(--secondary);
  }
`

const User = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    max-width: 150px;
    padding: 0.5rem 1rem;
    align-self: flex-end;
  }
  border-bottom: 1px solid #fff;
  padding-bottom: 0.5rem;
`
