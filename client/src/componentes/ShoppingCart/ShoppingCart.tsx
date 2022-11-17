import { Offcanvas, Stack } from "react-bootstrap";
import { CartItem } from "./CartItem";
import { useShoppingCart } from "./ContextShoppingCart";
import { Drawer } from "@mui/material"
import { useAppSelector } from "../../hooks";

/*<Offcanvas show={isOpen} onHide = {closeCart}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap = {3}>
                    {cartItems.map(item => (
                        <CartItem key = {item.id} {...item}/>
                    ))}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>*/

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart ( { isOpen }: ShoppingCartProps ) {
    const { closeCart, cartItems } = useShoppingCart()
    const Products = useAppSelector((state) => state.products.productList);
    return (

        <Drawer anchor='right' open={isOpen} onClose={closeCart} >
                <div className="text-center py-5 ms-auto font-bold  text-3xl ">Carrito de Compras</div>
        {cartItems.map(item => (
                        
                        <CartItem key = {item.id} {...item}/>
                    ))}
                    <div className="text-center py-10 ms-auto font-bold text-4xl ">
                        Total:{" $"}
                        {cartItems.reduce((total, cartItem) =>{
                            const prod = Products.find(i => i.id === cartItem.id)
                            return total + (prod?.price || 0) * cartItem.quantity
                        }, 0) 
                        }
                    </div>
                    <div className="py-4 flex flex-col items-center">
                    <button style = {{ width: "250px", }} className="justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">INICIAR COMPRA</button>
                    </div>
      </Drawer>

        
    )
}