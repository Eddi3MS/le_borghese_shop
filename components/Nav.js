import Link from 'next/link'
import { NavStyles, NavItems } from '../styles/NavStyles'
import Cart from './Cart'
import { useStateContext } from '../lib/context'
const { AnimatePresence, motion } = require('framer-motion')
import User from './User'
import { ShoppingCart } from 'phosphor-react'

export default function Nav() {
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <NavStyles>
      <Link href='/'>Le Borghese.</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQuantities}
            </motion.span>
          )}
          <ShoppingCart size={32} />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  )
}
