export interface product {
  name: String;
  rating: Number;
  description: String;
  price: Number;
  image: object | string;
  stock: Number;
  category: String;
  colors: Array<string>;
  sizes: Array<string>;
}

export interface user {
  name: String;
  email: String;
  username: String;
  password: String;
  birthday: Date;
}