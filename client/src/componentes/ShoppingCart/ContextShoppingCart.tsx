import { current } from "@reduxjs/toolkit";
import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "./ShoppingCart";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: string
    quantity: number
}

type ShoppingCartContex = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContex = createContext({} as ShoppingCartContex)

export function useShoppingCart(){
    return useContext(ShoppingCartContex)
}


export function ShoppingCartProvider({ children }:
ShoppingCartProviderProps){
    const [isOpen, setIsOPen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

        const openCart = () => setIsOPen(true)
        const closeCart = () => setIsOPen(false)

    function getItemQuantity(id: string){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: string){
        setCartItems(currItems =>{
            if(currItems.find(item => item.id === id) == null){
                return [...currItems, { id, quantity: 1}]
            }else{
                return currItems.map(item=>{
                    if(item.id === id){
                        return { ...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: string){
        setCartItems(currItems =>{
            if(currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            }else{
                return currItems.map(item=>{
                    if(item.id === id){
                        return { ...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: string){
        setCartItems(currItems =>{
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContex.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, cartItems, cartQuantity}}>
            {children}
        <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContex.Provider>
    )
}