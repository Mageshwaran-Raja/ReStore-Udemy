import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import  axios from 'axios';

export default function Catelog() {

    const [products, setProduct] = useState<Product[]>([]);

    useEffect(() => {
      axios.get("http://localhost:5000/api/Products")
        .then(response => setProduct(response.data))
        .catch(error => console.log(error));
    }, [])

    return (
    <>
        <ProductList products={products}/>
    </>
);
}