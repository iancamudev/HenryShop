import { useShoppingCart } from "./ContextShoppingCart"
import { ProductDetails } from "../../redux/slices/ProductSlice"
import { Button, Stack } from "react-bootstrap";
import { useAppSelector } from "../../hooks";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type CartItemProps = {
    id: string
    quantity: number
    color: string
    variante: string
}



export function CartItem({id, quantity, color, variante}: CartItemProps) {
    const Products = useAppSelector((state) => state.products.productList);
    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const prod = Products.find(i => i.id ===id)
    if(prod === null) return null
    return (<div className="flex flex-col m-2 p-2 items-center  bg-yellow border rounded-lg shadow-md md:flex-row md:max-w-xl">
            <img src={prod?.image}
            className="object-cover rounded-l-lg w-24 h-70 md:h-auto md:rounded-none md:rounded-l-lg " />
            <div className="flex p-2 w-full justify-between" >
                 <div className="w-full"><div className="text-xl font-bold ">
                    
                    {prod?.name} {" "}
                    </div>
                    <div className="font-medium flex w-full justify-between"><div>
                    <div className="text-lg">
                        Variante: {variante}
                    </div>
                    <div className="font-medium text-lg">
                        Color: {color}
                    </div></div>
                    <div className="text-2xl py-2 px-4 font-semibold">
                         ${prod?.price as number * quantity}
                    </div></div>
                    
                    <div className="flex mt-1 p-1 px-4 ml-16 justify-center w-32 border border-gray-600 rounded-xl space-x-3" >
                <div className="d-flex  justify-center" style={{gap: ".5rem"}}>
                <Button className="w-9 py-1 px-3 rounded-xl  bg-gray-600 text-white text-xl"  onClick={()=> decreaseCartQuantity(prod?.id as string, color, variante)}>-</Button>
                    </div>
                    <div  className="fs-3 pt-0.5 font-semibold text-2xl">{quantity}</div> 
                    <div> 
                <Button className="w-9 py-1 px-3 rounded-xl bg-gray-600 text-white text-xl"  onClick={() => increaseCartQuantity(prod?.id as string, color, variante)}>+</Button>
                </div>
                </div></div>
                <div className="pt-10 m-0 px-0"><button  style = {{ width: "80px", }} onClick={()=> removeFromCart(prod?.id as string, color, variante)}><DeleteOutlineIcon fontSize="large"/></button>               
                    </div>
                </div>
                </div>)
        
}