import React from "react";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'; /* Vamos importar o boostrap e font awesome que estão em node_modules depois de instalar as dependências*/
import 'font-awesome/css/font-awesome.min.css'; 

import { BrowserRouter } from 'react-router-dom' /* importar as rotas */

import Logo from '../components/template/Logo';
import Nav from '../components/template/Nav';
import Routes from "./Routes";
import Footer from "../components/template/Footer";

// Observe que o componente Main definido dentro de props, também está ligado ao componente Header porque Main.jsx importa Header.jsx. Ou seja, as propriedades (props) que foram recebidas no Main são passadas para Header
// O BrowserRouter coloca o # na frente da url do componente que tem o link. Já no componente que tem o "Link to", que no nosso caso é o Nav.jsx, teremos que fazer o import { Link } from "react-router-dom";
export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes />
            <Footer />
        </div>
    </BrowserRouter>
    