import {Routes, Route} from 'react-router-dom';
import {LoginPage} from 'pages/LoginPage';
import {RegisterPage} from 'pages/RegisterPage';
import {ReactNode} from "react";
import {FavoritesPage} from "pages/FavoritesPage";

export function App(): ReactNode {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/favorites" element={<FavoritesPage/>}/>
        </Routes>
    );
}