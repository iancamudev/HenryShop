import { Product } from "../../models/Product";


export const bestRating = async () => {
    const result = await Product.find( { rating: 5, deleted: false } );
    const filter = 
        result.map((e) => {
          return {
            name: e.name,
            image: e.image,
            rating: e.rating,
            id: e.id
          }
        })
    
    return filter;
  };