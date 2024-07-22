// types.ts
export interface Category {
  id: string;
  category: string;
  categoryArabicName: string;
  numberOfProviders: number;
  numberOfServices: number;
  status: string;
  image: string;
}

export interface Service {
  _id: string;
  serviceName: string;
  description: string;
  provider: string;
  category: string;
  type: string;
  fees: number;
  from: string | null;
  to: string | null;
  status: string;
  image: string;
  code: string;
}