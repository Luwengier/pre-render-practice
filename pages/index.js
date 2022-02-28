import fs from 'fs/promises'
import path from 'path'

function HomePage(props) {
  const { products } = props

  return products.map(product => {
    return (
      <div key={product.id}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
      </div>
    )
  })
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