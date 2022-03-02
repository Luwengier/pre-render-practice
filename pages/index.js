import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'

function HomePage(props) {
  const { products } = props

  return (
    <ul>
      {products.map(product => {
        return (
          <li key={product.id}>
            <Link href={`/${product.id}`}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export async function getStaticProps() {
  console.log('(Re-)Generating...')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  }
}

export default HomePage