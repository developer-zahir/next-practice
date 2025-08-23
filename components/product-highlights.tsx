import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, ArrowRight } from 'lucide-react'
import clientPromise from '@/lib/mongodb'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  featured?: boolean
}

export async function ProductHighlights() {
  const client = await clientPromise
  const db = client.db('myDatabase')

  const featuredProductsFromDb = await db
    .collection<Product>('products')
    .find({ featured: true })
    .limit(3)
    .sort({ _id: -1 })
    .toArray()
    

  // Convert ObjectId to string
  const featuredProducts = featuredProductsFromDb.map(p => ({
    id: p._id.toString(),
    name: p.name,
    description: p.description,
    price: p.price,
    image: p.image,
    category: p.category,
    featured: p.featured,
  }))

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
           Only Featured Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our hand-picked selection of premium products that customers love most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4">Featured</Badge>
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-background/80 backdrop-blur px-2 py-1 rounded">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">4.8</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full group">
                  <Link href={`/products/${product.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
