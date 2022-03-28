import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'

function LastSalesPage() {
  const { data, error } = useSWR('https://nextjs-course-545e4-default-rtdb.firebaseio.com/sales.json', fetcher)

  const [sales, setSales] = useState()
  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (data) {
      const transformedSales = []

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        })
      }

      setSales(transformedSales)
    }
  }, [data])

  // useEffect(() => {
  //   setIsLoading(true)

  //   const asyncFetchData = async () => {
  //     const data = await fetch('https://nextjs-course-545e4-default-rtdb.firebaseio.com/sales.json')

  //     const parsedData = await data.json()
  //     const transformedSales = []

  //     for (const key in parsedData) {
  //       transformedSales.push({
  //         id: key,
  //         username: parsedData[key].username,
  //         volume: parsedData[key].volume,
  //       })
  //     }

  //     setSales(transformedSales)
  //     setIsLoading(false)
  //   }

  // asyncFetchData()

  // fetch('https://nextjs-course-545e4-default-rtdb.firebaseio.com/sales.json')
  //   .then(response => response.json())
  //   .then(data => {

  //     console.log(2)
  //     const transformedSales = []

  //     for (const key in data) {
  //       transformedSales.push({
  //         id: key,
  //         username: data[key].username,
  //         volume: data[key].volume,
  //       })
  //     }

  //     setSales(transformedSales)
  //     setIsLoading(false)
  //   })

  //   console.log(3)
  // }, [])

  if (error) {
    return <p>Failed to load.</p>
  }

  if (!data || !sales) {
    return <p>Loading...</p>
  }


  return <ul>
    {sales.map(sale => <li key={sale.id}>
      {sale.username} - ${sale.volume}
    </li>)}
  </ul>
}

export default LastSalesPage


// https://nextjs-course-545e4-default-rtdb.firebaseio.com/