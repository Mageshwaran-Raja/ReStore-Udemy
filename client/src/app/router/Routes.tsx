import {Navigate, createBrowserRouter} from 'react-router-dom';
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import Catelog from '../../features/catelog/Catelog';
import ProductDetail from '../../features/catelog/ProductDetail';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';
import CheckoutPage from '../../features/checkout/CheckoutPage';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'catelog', element: <Catelog />},
            {path: 'catelog/:id', element: <ProductDetail />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'basket', element: <BasketPage />},
            {path: 'checkout', element: <CheckoutPage />},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ]
    }
])