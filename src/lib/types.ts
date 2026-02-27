export type LocalizedString = Record<"uk" | "en", string>;

export type ProductCategory = "pizza" | "burger" | "nuggets" | "drinks";
export type IngredientCategory = "meat" | "cheese" | "vegetables" | "sauces";

export type PizzaSize = 30 | 40;
export type CrustType = "thin" | "thick";
export type EdgeType = "standard" | "cheese" | "sausage";

export interface Ingredient {
  id: string;
  name: LocalizedString;
  category: IngredientCategory;
  price: number;
  imageUrl?: string;
}

export interface BaseProduct {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  imageUrl: string;
  category: ProductCategory;
}

export interface PizzaProduct extends BaseProduct {
  category: "pizza";
  variations: {
    size: PizzaSize;
    price: number;
    weight: number;
  }[];
  allowedCrusts: { type: CrustType; price: number }[];
  allowedEdges: { type: EdgeType; price: number }[];
  defaultIngredients: Ingredient[];
}

export interface DrinkProduct extends BaseProduct {
  category: "drinks";
  variations: {
    volume: number;
    price: number;
  }[];
}

export interface SimpleProduct extends BaseProduct {
  category: "burger" | "nuggets";
  price: number;
}

export type Product = PizzaProduct | DrinkProduct | SimpleProduct;

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;

  selectedSize?: PizzaSize;
  selectedCrust?: CrustType;
  selectedEdge?: EdgeType;
  selectedVolume?: number;

  removedIngredients?: Ingredient[];
  addedIngredients?: Ingredient[];

  totalPrice: number;
}
