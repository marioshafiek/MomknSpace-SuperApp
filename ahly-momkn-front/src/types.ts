// src/types.ts

export interface Category {
    image: string | undefined;
    category: string;
    categoryArabicName: string;
    numberOfProviders: number;
    numberOfServices: number;
    serviceAgent: string;
    status: "active" | "inactive";
  }
  