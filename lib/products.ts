export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  featured: boolean
}

// Mock products data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones with superior sound quality and 30-hour battery life.',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    category: 'Electronics',
    featured: true
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Advanced fitness tracking smartwatch with heart rate monitoring and GPS functionality.',
    price: 399.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    category: 'Electronics',
    featured: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Professional-grade coffee maker with programmable brewing and thermal carafe.',
    price: 149.99,
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg',
    category: 'Home',
    featured: true
  },
  {
    id: '4',
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand with adjustable height and ventilation.',
    price: 79.99,
    image: 'https://images.pexels.com/photos/4050298/pexels-photo-4050298.jpeg',
    category: 'Accessories',
    featured: false
  }
]

let products = [...mockProducts]

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function addProduct(product: Omit<Product, 'id'>): Product {
  const newProduct = {
    ...product,
    id: Date.now().toString()
  }
  products.push(newProduct)
  return newProduct
}
