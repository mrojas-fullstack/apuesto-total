import Button  from '@mui/material/Button';
import { CartItemType } from "../../interfaces/cartitem.interface";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item = ({ item, handleAddToCart }: Props) => {
  return (
    <div className='item'>
      <img src={item.image} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <div style={{display:'flex', gap:'5px', justifyContent:'center'}}>
          Categoría: <p style={{color: 'yellow'}}>{item.species}</p>
        </div>
        <h3>${item.id}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </div>
  );
};

export default Item
