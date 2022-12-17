import styled from 'styled-components'
const { motion } = require('framer-motion')

export const Wrapper = styled.div`
  margin: 5rem auto;
  width: min(800px, 100%);
`

export const TotalInfo = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary);
  margin-top: 0.5rem;
  display: flex;

  span {
    color: var(--secondary);
    font-weight: 500;
    margin-left: auto;
  }
`

export const GeneralInfo = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: var(--primary);
  color: var(--secondary);
  display: flex;

  span {
    font-weight: 400;
    margin-left: auto;
  }
`

export const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 3rem 3rem;

  h1 {
    color: var(--primary);
    line-height: 1;
  }

  h2 {
    color: var(--secondary);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }
  button {
    padding: 1rem 2rem;
    margin-top: 2rem;
    max-width: 240px;
    background-color: #fff;
  }
`
export const Address = styled.div`
  font-size: 1rem;
  width: 100%;
  max-width: 500px;
`
export const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;
  max-width: 500px;
  div {
    padding-bottom: 1rem;
  }
`
export const InfoWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;

  gap: 2.5rem;
`
