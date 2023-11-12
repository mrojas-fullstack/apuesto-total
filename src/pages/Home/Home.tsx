import { 
  CircularProgress, 
  Grid, 
  Drawer, 
  Badge, 
  Pagination, 
  Stack, 
  Tooltip
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useState, useEffect } from "react";
import Item from "../../components/Item/Item";
import Cart from "../../components/Cart/Cart";
import { CartItemType } from "../../interfaces/cartitem.interface";
import { products } from '../../services/api';
import { Link } from 'react-router-dom';
import FilterCategory from '../../components/FilterCategory/FilterCategory';

import "./home.scss";

function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [allPages, setAllPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState('');

  let pagina = [...Array(5)].map((_, indx:number) => (indx + 1) + (page-1)*5).toString();

  useEffect(() => {
    setLoading(true);
    if(category.length > 0) {
      products
        .getByCategory({ species: category })
        .then((r:any) => {
          let por_pagina = [...Array(5)].map((_, indx:number) => r.data.results[indx + (page-1)*5]) as any;
          setAllProducts(por_pagina);
          setAllPages(Math.round(r.data.results.length/5));
          setTimeout(() => setLoading(false), 500);
        })
        .catch(e =>{
          setError(true);
          console.log(e);
        })
    } else {
      products
        .getByPage({ page: pagina })
        .then((r:any) => {
          setAllProducts(r.data);
          setAllPages(10);
          setTimeout(() => setLoading(false), 500);
        })
        .catch(e =>{
          setError(true);
          console.log(e);
      })
    }
  },[page, category]);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  const handleChange = (e: any, p:number) => {
    setPage(p);
    console.log('numero', e);
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Lamentamos la molestia, muy pronto estaremos de regreso.</div>;

  return (
    <>
    <div className="title" style={{position:'relative', top:0}}>
      <h1>Productos</h1>
    </div>
    <div className="container">
      <div className="products">
        <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            setCartOpen={setCartOpen}
          />
        </Drawer>

        <div className='icons-home'>
          <div className='filer-category' style={{right:'100px'}}>
            <FilterCategory category={category} setCategory={setCategory}/>
          </div>

          <div className="styled-button" style={{right:'60px', top:'35px'}} onClick={() => setCartOpen(true)}>
            <Tooltip title="Carrito">
              <Badge badgeContent={getTotalItems(cartItems)} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </Tooltip>
          </div>

          <div className="styled-button" style={{top:'35px'}}>
            <Tooltip title="Historial">
              <Link to={"history"}><ManageSearchIcon/></Link>
            </Tooltip>
          </div>
        </div>

        <Grid container spacing={2}>
          {allProducts?.map((item: any) => (
            <Grid item key={item.id} xs={12} md={3} sm={6}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
        <br/>
        <Stack spacing={2} sx={{display:'flex', alignItems:'center', padding: '30px 0 60px 0'}}>
          <Pagination count={allPages} page={page} color="primary" onChange={handleChange} sx={{color:'white'}}/>
        </Stack>
      </div>
    </div>
    </>
  );
}

export default Home
