import {
  CartStyle,
  Card,
  EmptyStyle,
  CartWrapper,
  CardInfo,
  Checkout,
  Cards,
} from '../styles/CartStyles'
import { Button, Quantity } from '../styles/ProductDetails'
//Import State
import { useStateContext } from '../lib/context'
import getStripe from '../lib/getStripe'
import formatMoney from '../lib/formatMoney'
import { MinusCircle, PlusCircle, ShoppingCart } from 'phosphor-react'
import { card, cards } from '../pages'

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext()
  console.log('🚀 ~ file: Cart.js:18 ~ Cart ~ totalPrice', totalPrice)

  //Payment
  const handleCheckout = async () => {
    const stripePromise = await getStripe()
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })
    const data = await response.json()
    await stripePromise.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        layout
        initial={{ x: '50%' }}
        animate={{ x: 0 }}
        exit={{ x: '50%' }}
        transition={{ type: 'tween' }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1>Seu carrinho está vazio.</h1>
            <ShoppingCart size={48} weight='bold' />
          </EmptyStyle>
        )}
        <Cards layout variants={cards} initial='hidden' animate='show'>
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Card layout variants={card} key={item.slug}>
                  <img
                    src={item.image.data.attributes.formats.small.url}
                    alt={item.title}
                  />
                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>{formatMoney(item.price)}</h3>
                    <Quantity>
                      <span>Quantidade</span>
                      <button onClick={() => onRemove(item)}>
                        <MinusCircle size={32} />
                      </button>
                      <p>{item.quantity}</p>
                      <button onClick={() => onAdd(item, 1)}>
                        <PlusCircle size={32} />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              )
            })}
        </Cards>
        <Checkout layout>
          {cartItems.length >= 1 && (
            <div>
              <h3>Subtotal {formatMoney(totalPrice)}</h3>
              <Button onClick={handleCheckout}>Finalizar Compra</Button>
            </div>
          )}
        </Checkout>
      </CartStyle>
    </CartWrapper>
  )
}
