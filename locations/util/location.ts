import { Location } from "../constants/types";
import env from "../env.json";

const GOOGLE_API_KEY = env.GOOGLE_MAPS_STATIC_API_KEY;
const GOOGLE_API_SIGNATURE = env.GOOGLE_MAPS_STATIC_SIGNATURE;

export const getMapPreview = ({ lat, lng }: Location) => {
  //   return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}&signature=${GOOGLE_API_SIGNATURE}`;
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
};

export const getAddress = async (lat: number, lng: number): Promise<string> => {
  console.log("getAddress", lat, lng);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }

  const data = await response.json();
  return data.results[0].formatted_address;
};
