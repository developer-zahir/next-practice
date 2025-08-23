import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  const client = await clientPromise
  const db = client.db("myDatabase")
  const products = await db.collection("products").find({}).toArray()
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const body = await req.json()
  const client = await clientPromise
  const db = client.db("myDatabase")

  const result = await db.collection("products").insertOne({
    ...body,
    createdAt: new Date(),
  })

  const newProduct = await db.collection("products").findOne({ _id: result.insertedId })
  return NextResponse.json(newProduct)
}
