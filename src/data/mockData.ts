import { Product, Scheme } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wheat",
    quantity: "50 Quintals",
    location: "Punjab",
    price: 2450,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    type: "grain"
  },
  {
    id: 2,
    name: "Basmati Rice",
    quantity: "30 Quintals",
    location: "Haryana",
    price: 3850,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    type: "grain"
  },
  {
    id: 3,
    name: "Fresh Tomatoes",
    quantity: "20 Quintals",
    location: "Maharashtra",
    price: 1200,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82ber40a?w=400&h=300&fit=crop",
    type: "vegetable"
  }
];

export const schemes: Scheme[] = [
  {
    id: 1,
    title: "PM-KISAN Yojana",
    description: "Direct income support of ₹6,000 per year to farmer families.",
    subsidy: "11 Cr+ Beneficiaries",
    icon: "₹",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    id: 2,
    title: "PM Krishi Sinchai",
    description: "Micro irrigation and water conservation schemes.",
    subsidy: "Up to 55% Subsidy",
    icon: "💧",
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 3,
    title: "Kisan Credit Card",
    description: "Easy access to credit for purchasing seeds and equipment.",
    subsidy: "4% Interest Rate",
    icon: "💳",
    color: "bg-purple-100 text-purple-600"
  }
];