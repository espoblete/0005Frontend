import { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import "./catalogue.css"
import Product from './Product/Product.jsx'

//se define la funcion componente y 2 variables de estado para productos a pedir y su spinner mientras carga producto
export default function Catalogue() {
  const [products, setProducts] = useState([])
  const [loadingData, setLoadingData] = useState(true)

  //retorna el catalogo de productos a traves de try/catch , todo en un contenedor mediante map al listado de productos. 
  //primero se hizo una peticion simulada a la api, ya que los datos están aquí mismo. Pero Se cambiará por un fetch o puede ser axios.
  //useEffect porque es colateral al renderizado de la vista, así nos aseguramos que no habran errores en al vista
  useEffect(() => {
    const obtenerCatalogue = async () => {
      //const productos = await Promise.resolve([{ _id: '1', name: 'Product 1', description: 'Ejemplo 1', price: '12300', image: '' }, { _id: '2', name: 'Product 1', description: 'Ejemplo 1', price: '12300', image: '' }, { _id: '2', name: 'Product 1', description: 'Ejemplo 1', price: '12300', image: '' }, { _id: '3', name: 'Product 1', description: 'Ejemplo 1', price: '12300', image: '' }, { _id: '4', name: 'Product 1', description: 'Ejemplo 1', price: '12300', image: '' }, { _id: '5', name: 'Product 1', description: 'Ejemplo 1', price: '12300', image: '' }, { _id: '1', name: 'Product 1', description: 'Ejemplo 1', price: '12300', image: '' }, { _id: '6', name: 'Product 1', description: 'Ejemplo 1', price: '12300', image: '' }, { _id: '7', name: 'Product 1', description: 'Ejemplo 1', price: '12300', image: '' }])
      //setProducts(productos)
      //setLoadingData(false)
      //}
   
      try {
        //fetch a la api, fetch por defecto hace request "get".
        const response = await fetch( 'http://localhost:3001/products' )
        //respuesta se transforma a json y se agrega a products para ser seteado y se pueda ver en pantalla.
        const products = await response.json()
        setProducts( products )
        setLoadingData( false )
      
      } catch ( error ) {
        console.error( error )
      }
    } 
    try {
      obtenerCatalogue()
      } catch (error) {
        setLoadingData(false)
        console.error(error)
    }
  }, [])

  return (
    <Container>
      <p>Catálogo de Productos</p>
      {
        loadingData ? (
          <Spinner animation='border' role={"status"}></Spinner>
        ) :
          <div className='list-products'>
            {
              products.length === 0 ?
                <h1>No hay productos</h1>
                : products.map((product, index) => (
                  <Product product={product} key={index}></Product>
                ))
            }
          </div>
      }
    </Container>
  )
}