import { ProductStyles } from '../styles/ProductStyle'
import Link from 'next/link'
import formatMoney from '../lib/formatMoney'

export default function Product({ product, ...rest }) {
  //Extract from props
  const { title, price, image, slug } = product.attributes
  return (
    <Link href={`/product/${slug}`}>
      <ProductStyles {...rest}>
        <div className='image__wrapper'>
          <img src={image.data.attributes.formats.small.url} alt={title} />
        </div>
        <h2>{title} </h2>
        <h3>{formatMoney(price)}</h3>
      </ProductStyles>
    </Link>
  )
}
