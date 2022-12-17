import { motion } from 'framer-motion'
import styled from 'styled-components'

export const DetailsStyle = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  img {
    width: 40%;
  }
`

export const ProductInfo = styled(motion.div)`
  width: 40%;
  button {
    font-size: 1rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`

export const ProductPrice = styled.span`
  margin-top: 1rem;
  color: var(--secondary);
  font-weight: 400;

  & > span {
    font-weight: bold;
  }
`

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;

  button {
    background: transparent;
    border: none;
    display: flex;
    padding: 0;
  }
  p {
    width: 1rem;
    margin-inline: 0.5rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
    margin-right: 0.5rem;
  }

  svg {
    color: #494949;
  }
`

export const Button = styled.button`
  width: 100%;
  border-color: var(--primary);
  color: var(--primary);
  // text-transform: uppercase;
  font-weight: 600;
  transition: all 0.2s ease-in;

  &:hover,
  &:focus {
    outline: none;
    background-color: var(--primary);
    color: #fff;
  }
`
