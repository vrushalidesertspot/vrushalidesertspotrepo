export interface Cake {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  isAvailable: boolean;
  rating?: number;
  reviews?: number;
  flavors?: string[];
  weights?: number[];
  isEggless?: boolean;
  isBestseller?: boolean;
  isTrending?: boolean;
}

export interface CartItem extends Cake {
  quantity: number;
  selectedFlavor: string;
  selectedWeight: number;
  customMessage?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}
