export type Product = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  model: string;
  series: string;
  btu: number;
  energy_class: string;
  cooling_kw: number;
  heating_kw: number;
  noise_db: number;
  wifi: boolean;
  type: string;
  price: number;
  old_price: number | null;
  image: string;
  description: string;
  features: string;
  in_stock: boolean;
  featured: boolean;
};

export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  price_from: number;
  details: string;
};

export type Testimonial = {
  id: number;
  name: string;
  city: string;
  rating: number;
  text: string;
};

export type HeatPump = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  model: string;
  series: string;
  type: string;
  phase: string;
  power_kw: number;
  energy_class: string;
  cop: number;
  dhw: boolean;
  price: number;
  image: string;
  description: string;
  features: string;
  in_stock: boolean;
  featured: boolean;
};
