import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET single product by ID
export async function GET(
  request: Request,
  context: { params: { id: string } }   // <-- সঠিক টাইপ এখানে
) {
  try {
    const client = await clientPromise;
    const db = client.db("myDatabase");
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(context.params.id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
