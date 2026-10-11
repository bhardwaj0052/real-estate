export interface Property {
  id: string;
  ownerId?: string;
  phone?: number;
  title: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  propertyType: string;
  bhk: number;
  sqft: number;
  price: number;
  amenities: string[];
  images: string[];
  status?: string;
  publishedAt?: Date;
  rejectionReason?: string;
}
export interface Updatestatus{
  id:string,
  status: string,
  rejectionReason?: string;
}