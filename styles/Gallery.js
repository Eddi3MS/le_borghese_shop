import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Gallery = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
  padding-bottom: 2rem;
`
