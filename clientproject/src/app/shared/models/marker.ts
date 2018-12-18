export interface Marker {
  lat: number;
  lng: number;
  draggable: boolean;
  title: string;
  origin: object;
  name: string;
  icon: object;
  logo: string;
  street: string;
  city: string;
  state: string;
  postalcode: string;
  email: string;
  phone: string;
  website: string;
  detail?: string;
}
