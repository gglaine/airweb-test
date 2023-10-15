import { Product, Category } from './types';

export const products: Product[] = [
  {
    sku: "SKU001",
    id: "1",
    label: "TUPAC X PETIT ANGE",
    description: "T-SHIRT EN COTTON RECYCLE AVEC DESIGN EXCLUSIF SUR LA POITRINE",
    price: 3900,
    category_id: "1",
    thumbnail_url: "/products/PETITANGE.svg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Grey"],
    brand: "Petit Ange Co.",
    stock: 50,
    additional_details: {
      shirt_type: "CLASSIC FIT T-SHIRT.",
      fabric: "100% Cotton",
      material: "100% Cotton"
    }
  },
  {
    sku: "SKU002",
    id: "2",
    label: "PADAMALGAM500",
    description: "PADG 500 limited edition t-shirt. Comfort fit and vibrant print.",
    price: 4500,
    category_id: "1",
    thumbnail_url: "/products/PADAM-B.svg",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Red", "Blue", "Black"],
    brand: "PADG",
    stock: 35,
    additional_details: {
      shirt_type: "CLASSIC FIT T-SHIRT",
      fabric: "95% Cotton, 5% Elastane",
      material: "95% Cotton, 5% Elastane"
    }
  },
  {
    sku: "SKU003",
    id: "3",
    label: "Jean Lasalle x Motorhead",
    description: "Exclusive collaboration t-shirt featuring Jean Lasalle and Motorhead graphics.",
    price: 4200,
    category_id: "1",
    thumbnail_url: "/products/MOTORHEAD.svg",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Navy"],
    brand: "Jean Lasalle",
    stock: 20,
    additional_details: {
      shirt_type: "CLASSIC FIT T-SHIRT.",
      fabric: "90% Cotton, 10% Polyester",
      material: "90% Cotton, 10% Polyester"
    }
  },
  // Add similar information for other products
];

export const categories: Category[] = [
  {
    id: "1",
    index: 0,
    label: "TSHIRTS",
    description: "T-shirts"
  },
  {
    id: "2",
    index: 1,
    label: "MUGS",
    description: "Appliances for your home"
  }
  // Add more categories as needed
];
