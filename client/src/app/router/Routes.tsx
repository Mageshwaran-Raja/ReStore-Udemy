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
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import RequireAuth from './RequireAuth';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'checkout', element: <CheckoutPage />}
            ]},
            {path: '', element: <HomePage />},
            {path: 'catelog', element: <Catelog />},
            {path: 'catelog/:id', element: <ProductDetail />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'basket', element: <BasketPage />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ]
    }
])