import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET - fetch all products
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("myDatabase")

    // Recent products আগে দেখানোর জন্য sort করা হচ্ছে
    const products = await db
      .collection("products")
      .find({})
      .sort({ _id: -1 })  // -1 মানে descending, নতুনগুলো আগে
      .toArray()

    return NextResponse.json(products)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

// POST - add a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, category, image, featured } = body;

    if (!name || !description || !price || !category || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("myDatabase");

    const newProduct = await db.collection("products").insertOne({
      name,
      description,
      price: parseFloat(price),
      category,
      image,
      featured: featured || false,
      createdAt: new Date(),
    });

    // fetch the inserted document to return
    const product = await db.collection("products").findOne({ _id: newProduct.insertedId });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
