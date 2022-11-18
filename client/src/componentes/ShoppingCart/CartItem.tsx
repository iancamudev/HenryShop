import { useShoppingCart } from "./ContextShoppingCart"
import { ProductDetails } from "../../redux/slices/ProductSlice"
import { Button, Stack } from "react-bootstrap";
import { useAppSelector } from "../../hooks";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type CartItemProps = {
    id: string
    quantity: number
}



export function CartItem({id, quantity}: CartItemProps) {
    const Products = useAppSelector((state) => state.products.productList);
    const {removeFromCart} = useShoppingCart()
    const prod = Products.find(i => i.id ===id)
    if(prod === null) return null
        
    return (<Stack direction = "horizontal" gap={2} className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img src={prod?.image}
            style = {{ width: "180px", height: "250 px", objectFit: "cover"}} className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" />
            <div className="flex-col">
                 <div className="text-3xl">
                    <div><button  style = {{ width: "180px", }} onClick={()=> removeFromCart(prod?.id as string)}><DeleteOutlineIcon fontSize="medium"/></button>               
                    </div>
                    {prod?.name} {" "}
                    </div>
                    <div className="text-xl">
                        Cantidad: {quantity}
                </div>
                <div className="text-xl">
                        ${prod?.price as number * quantity}
                </div>
                
            </div>
        </Stack>)
        
}