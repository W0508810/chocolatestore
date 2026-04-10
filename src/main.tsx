import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './index.css'

import Home from './components/pages/Home.tsx'
import Checkout from './components/pages/Checkout.tsx'
import Confirmation from './components/pages/Confirmation.tsx'
import Details from './components/pages/Details.tsx'
import Layout from './components/pages/Layout.tsx'
import About from './components/pages/About.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/Checkout" element={<Checkout />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)