import { Box, Button, Modal } from "@mui/material";
import { CartItemType } from "../../interfaces/cartitem.interface";
import CartItem from "../CartItem/CartItem";
import { useState, useContext } from "react";
import { CountContext } from "../../App";

type Props = {
  cartItems: CartItemType[];
  setCartItems: (data:any) => void;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  setCartOpen:(estado:boolean) => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'rgb(88, 24, 69)',
  borderRadius: '15px',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  textAlign: 'center',
};

const Cart = ({ cartItems, setCartItems, addToCart, removeFromCart, setCartOpen }: Props) => {
  const [open, setOpen] = useState(false);
  const { count, setCount } = useContext(CountContext);
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.amount * item.id, 0);
  
  let date = new Date().toJSON();
    
  const handleOpen = ()=>{
    setOpen(true);
    setCount(count + 1);
    localStorage.setItem((`count`), count + 1);
  }

  const handleClose = () => {
    let historial = new Array;
    cartItems.map((item) => {
      let data = {
        product:item.name, 
        price: item.id, 
        amount: item.amount
      }
      historial.push(data);
    });
    localStorage.setItem((`total-${count}`), JSON.stringify({total: calculateTotal(cartItems).toFixed(2), date: date}));
    localStorage.setItem((`compra-${count}`), JSON.stringify(historial));
    setOpen(false);
    setCartOpen(false);
    setCartItems([]);
  };

  return (
    <>
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? <p>No hay productos en el carrito de compras</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Button 
        className={cartItems.length === 0 ? 'button-disabled' : ''}
        onClick={handleOpen} 
        disabled = {cartItems.length === 0 ? true : false}>Confirmar compra</Button>
    </div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 300 }}>
        <h2 id="child-modal-title" style={{display: 'flex', color:'yellow', justifyContent: 'center'}}>&#x2705; ¡Felicitaciones! &#x2705;</h2>
        <p id="child-modal-description">
          La compra se realizo con exito. ¡Gracias por su compra!, vuelva pronto.
        </p>
        <Button onClick={handleClose}>Cerrar</Button>
      </Box>
    </Modal>
  </>
  );
};

export default Cart
