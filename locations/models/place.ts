import { Address } from "../constants/types";

export class Place {
  title: string;
  imageUri: string;
  location: Address;
  id: string;

  constructor(title: string, imageUri: string, location: Address, id: string) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = location;
    this.id = id;
  }
}
