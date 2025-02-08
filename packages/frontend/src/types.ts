// Preferably this should inferred from the Prisma generated schemas for single source of truth. For now, we'll just use this.
export interface Address {
  id: number;
  address: string;
  country: string;
  zip: string;
}
