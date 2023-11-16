export type Location = {
  lat: number;
  lng: number;
};

export type Address = Location & {
  address: string;
};
