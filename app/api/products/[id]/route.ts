import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }   // 🔥 এখানে Promise<{id:string}>
) {
  try {
    const { id } = await params   // 🔥 params কে await করতে হবে

    const client = await clientPromise
    const db = client.db("myDatabase")
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}
