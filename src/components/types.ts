export interface Product {
  sku: string;
  additional_details: {
    shirt_type?: string;
    fabric?: string;
    shipping_info?: string;
    material?: string;   // Moved here for organization
    // Add more key-value pairs as needed
  };
  id: string;
  label: string;
  description: string;
  price: number;
  category_id: string;
  thumbnail_url: string | null;
  sizes?: string[];      // Consider if sizes could have additional properties in the future
  colors?: string[];     // Same consideration for colors
  brand?: string;      
  stock?: number;        // Consider describing what this represents (e.g., number of items in stock)
}

export interface Category {
  id: string;
  index: number;        // Consider describing the purpose of 'index' here
  label: string;
  description: string;
}

