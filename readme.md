### **Next.js Product Listing & Detail Page**

A modern e-commerce product listing and detail page built with **Next.js 13**, featuring product search, category filters, and a "Load More" pagination functionality. The project fetches products from a **MongoDB** backend and displays related products on each product detail page.

-----

### **Features**

  - **Product Listing Page**

      - Displays all products in a responsive grid.
      - Search bar for filtering products by name, description, or category.
      - "Load More" button for incremental pagination.
      - Featured badge and ratings display.
      - Skeleton loading placeholders while fetching data.

  - **Product Detail Page**

      - Detailed product information including name, description, category, price, and features.
      - Related products based on category.
      - Featured badge for highlighted products.
      - Action buttons: Add to Cart, Buy Now, Favorite, and Share.

  - **Reusable UI Components**

      - Cards, Buttons, Badges, Inputs, and Skeletons using a Tailwind-based component library.

-----

### **Tech Stack**

  - [Next.js 13](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [MongoDB](https://www.mongodb.com/) (via `mongodb` npm package)
  - [Lucide Icons](https://lucide.dev/)

-----

### **Project Structure**

```
.
├── app/
│ ├── products/
│ │ ├── [id]/ # Product detail page
│ │ └── page.tsx # Products listing page
├── components/
│ ├── navbar.tsx
│ ├── footer.tsx
│ ├── ui/
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── badge.tsx
│ │ └── skeleton.tsx
├── lib/
│ ├── mongodb.ts # MongoDB connection
│ └── products.ts # Product types
├── pages/api/
│ └── products/ # API routes for CRUD operations
└── README.md
```

-----

### **Getting Started**

#### **Prerequisites**

  - Node.js \>= 18.x
  - npm or yarn
  - MongoDB database (local or cloud)

#### **Installation**

1.  Clone the repository:

<!-- end list -->

```bash
git clone https://github.com/yourusername/nextjs-product-listing.git
cd nextjs-product-listing
```

2.  Install dependencies:

<!-- end list -->

```bash
npm install
# or
yarn install
```

3.  Create a `.env.local` file with your MongoDB URI:

<!-- end list -->

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase
```

4.  Start the development server:

<!-- end list -->

```bash
npm run dev
# or
yarn dev
```

Open `http://localhost:3000/products` to view the app.

-----

### **API Routes**

  - `GET /api/products` - Fetch all products
  - `GET /api/products/:id` - Fetch a single product by ID
  - `POST /api/products` - Add a new product
  - `GET /api/products?category=categoryName` - Fetch products by category (used for related products)

-----

### **Usage**

  - Search for products using the search bar.
  - Click **Load More** to see additional products.
  - Click on a product card to view its details and related products.