export interface product {
  name: String;
  rating: Number;
  description: String;
  price: Array<Number>;
  image: string;
  stock: Number;
  category: String;
  colors: Array<string>;
  sizes: Array<string>;
  reviews: Array<object>;
}

export interface user {
  name: String;
  email: String;
  confirmed: Boolean;
  username: String;
  password: String;
  birthday: Date;
  isAdmin: Boolean;
  reviews: Array<object>;
}

export interface shopping {
  userId: string;
  products: Array<object>;
}

export interface googleUser {
  name: String;
  email: String;
  googleId: String;
  birthday: Date | null;
  isAdmin: Boolean;
  confirmed: Boolean;
}

export interface githubUser {
  username: String;
  githubId: String;
  birthday: Date | null;
  isAdmin: Boolean;
  confirmed: Boolean;
}

export interface category {
  name: String;
}

export interface review {
  text: String;
  number: Number;
}

