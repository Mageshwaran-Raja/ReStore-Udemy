import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Product } from "../../app/models/Product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "../basket/basketSlice";
import { fetchProductAsync, productSelector } from "./catalogSlice";

export default function ProductDetail(){
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    const {id} = useParams<{id: string}>();
    const product = useAppSelector(state => productSelector.selectById(state, id!));
    //const [product, setProduct] = useState<Product | null>(null);
    const {status: productStatus} = useAppSelector(state => state.catalog);
    // const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(0);

    const item = basket?.items.find(i => i.productId === product?.id);


    useEffect(() => {
        if (item) setQuantity(item.quantity);
        // id && agent.Catelog.details(parseInt(id))
        //     .then(response => setProduct(response))
        //     .catch(error => console.log(error))
        //     .finally(() => setLoading(false));
        if (!product && id) dispatch(fetchProductAsync(parseInt(id)));

    }, [id, item, dispatch, product]);

    function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updateQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.id!, quantity: updateQuantity}))
        } else {
            const updateQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updateQuantity}))
        }
    }

    if(productStatus.includes('pending')) return <LoadingComponent message="Loading Product..." />

    if(!product) return <NotFound />

    return(
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3' color='secondary'>{product.name}</Typography>
                <Divider sx={{md: 2}} />
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity In Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField  
                            variant="outlined"
                            type="number"
                            fullWidth
                            label="Quantity in cart"
                            onChange={handleInputChange}
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled = {item?.quantity === quantity || !item && quantity === 0}
                            loading = {status.includes('pending')}
                            sx={{height: '55px'}}
                            onClick={handleUpdateCart}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}