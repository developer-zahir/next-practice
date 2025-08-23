"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Star, Heart, Share2, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (res.ok) {
          const data: Product = await res.json();
          setProduct(data);

          // fetch related products from same category
          const relatedRes = await fetch(`/api/products?category=${encodeURIComponent(data.category)}`);
          if (relatedRes.ok) {
            const relatedData: Product[] = await relatedRes.json();
            console.log("all Related products fetched:", relatedData);

            const filteredRelated = relatedData.filter((p) => p._id.toString() !== product?._id.toString()).slice(0, 4);
            setRelatedProducts(filteredRelated);
            console.log("filterd Related products fetched:", setRelatedProducts);
          }
        }
      } catch (err) {
        console.error("Failed to fetch related product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product?._id , params.id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="w-full h-96 rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-muted">
              <Image src={product.image} alt={product.name} width={600} height={600} className="w-full h-96 lg:h-[500px] object-cover" />
              {product.featured && <Badge className="absolute top-4 left-4">Featured</Badge>}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">(4.8)</span>
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                In Stock
              </Badge>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Button variant="outline" className="w-full" size="lg">
                Buy Now
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Premium quality materials</li>
                  <li>• 30-day money-back guarantee</li>
                  <li>• Free shipping on orders over $50</li>
                  <li>• 24/7 customer support</li>
                  <li>• Secure payment processing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Card key={p.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="bg-muted rounded-lg h-32 mb-4">
                      <Image src={p.image} alt={p.name} width={300} height={200} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <h3 className="font-semibold mb-2">{p.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{p.description}</p>
                    <span className="font-bold text-primary">${p.price}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
