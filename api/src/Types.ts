export interface product {
  name: String;
  rating: Number;
  description: String;
  price: Number;
  image: string;
  stock: Number;
  category: String;
  colors: Array<string>;
  sizes: Array<string>;
}

export interface user {
  name: String;
  email: String;
  confirmed: Boolean;
  username: String;
  password: String;
  birthday: Date;
  isAdmin: Boolean;
}

export interface shopping {
  userId: string,
  products: Array<object>
}

export interface googleUser {
  name: String;
  email: String;
  birthday: Date;
}

export interface category{
  name: String;
}

