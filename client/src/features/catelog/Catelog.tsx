import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

export default function Catelog() {

    const [products, setProduct] = useState<Product[]>([]);

    useEffect(() => {
      fetch("http://localhost:5000/api/Products")
        .then(response => response.json())
        .then(data => setProduct(data));
    }, [])

    return (
    <>
        <ProductList products={products}/>
    </>
);
}