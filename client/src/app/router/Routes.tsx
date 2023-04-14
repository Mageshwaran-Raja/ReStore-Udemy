import {createBrowserRouter} from 'react-router-dom';
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import Catelog from '../../features/catelog/Catelog';
import ProductDetail from '../../features/catelog/ProductDetail';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';

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
        ]
    }
])