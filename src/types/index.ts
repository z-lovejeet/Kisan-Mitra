export interface Product {
  id: number;
  name: string;
  quantity: string;
  location: string;
  price: number;
  image: string;
  type: 'grain' | 'vegetable' | 'fruit';
}

export interface Scheme {
  id: number;
  title: string;
  description: string;
  subsidy: string;
  icon: string;
  color: string;
}

export interface Agent {
  id: number;
  name: string;
  role: string;
  rating: number;
  location: string;
  tags: string[];
  image: string;
}