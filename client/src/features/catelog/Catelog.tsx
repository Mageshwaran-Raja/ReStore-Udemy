import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelector } from "./catalogSlice";

export default function Catelog() {

    // const [products, setProduct] = useState<Product[]>([]);
    const products = useAppSelector(productSelector.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    // const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
    //   axios.get("http://localhost:5000/api/Products")
    //     .then(response => setProduct(response.data))
    //     .catch(error => console.log(error));
    if(!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    if(status.includes('pending')) return <LoadingComponent message="Loading Products..."/>

    return (
    <>
        <ProductList products={products}/>
    </>
);
}