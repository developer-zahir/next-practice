import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET - fetch all products or by category
export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("myDatabase");

    const url = new URL(req.url);
    const category = url.searchParams.get("category"); // query থেকে category পাওয়া

    const filter = category ? { category } : {}; // যদি category থাকে তাহলে filter
    const products = await db
      .collection("products")
      .find(filter)
      .sort({ _id: -1 }) // Recent products আগে দেখাবে
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
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

    const product = await db.collection("products").findOne({ _id: newProduct.insertedId });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
