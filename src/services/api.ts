// Axios
import axios from "axios";
import { CartItemType } from "../interfaces/cartitem.interface";

export const products =  {
    getAll: async function (){
        return await axios.get<CartItemType[]>(
            `https://rickandmortyapi.com/api/character`
        );
    },
    getByPage: async function ({ page} : {page?: string}){
        return await axios.get<CartItemType[]>(
            `https://rickandmortyapi.com/api/character/${page}`
        );
    },
    getById: async function ({ id } : { id?: number}){
        return await axios.get<CartItemType[]>(
            `https://rickandmortyapi.com/api/character/${id}`
        );
    },
    getByCategory: async function ({ species } : { species?: string}){
        return await axios.get<CartItemType[]>(
            `https://rickandmortyapi.com/api/character/?species=${species}`
        );
    },
};