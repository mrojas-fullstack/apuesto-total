import { Add, Remove } from '@mui/icons-material';
import { CartItemType } from "../../interfaces/cartitem.interface";


type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem = ({ item, addToCart, removeFromCart }: Props) => {
  return (
    <div className='cart-item'>
        <img src={item.image} alt={item.name} />
        <div>
            <h3>{item.name}</h3>
            <div className="information">
                <p>Price: ${item.id}</p>
                <p>Total: ${(item.amount * item.id).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <div
                    className='icon'
                    onClick={() => removeFromCart(item.id)}
                >
                    <Remove/>
                </div>
                <p>{item.amount}</p>
                <div
                    className='icon'
                    onClick={() => addToCart(item)}
                >
                    <Add/>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CartItem
