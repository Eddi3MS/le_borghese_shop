import { motion } from 'framer-motion'
import styled from 'styled-components'

export const ProductStyles = styled(motion.a)`
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  height: 460px;
  cursor: pointer;

  .image__wrapper {
    overflow: hidden;
    max-height: 380px;

    img {
      display: block;
      max-width: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  h2 {
    padding: 0.5rem 0rem;
  }
`
