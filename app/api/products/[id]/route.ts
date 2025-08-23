import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(
  request: Request,
  context: { params: { id: string } }  // ✅ Correct typing
) {
  try {
    const client = await clientPromise
    const db = client.db("myDatabase")

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(context.params.id) })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}
