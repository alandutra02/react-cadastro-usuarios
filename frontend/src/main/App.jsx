import React from "react";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'; /* Vamos importar o boostrap e font waesome que estão em node_modules depois de instalar as dependências*/
import 'font-awesome/css/font-awesome.min.css';

import Logo from '../components/template/Logo';
import Nav from '../components/template/Nav';
import Main from "../components/template/Main";
import Footer from "../components/template/Footer";

// Observe que o componente Main definido dentro de props, também está ligado ao componente Header porque Main.jsx importa Header.jsx. Ou seja, as propriedades (props) que foram recebidas no Main são passadas para Header
export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <Main icon="home" title="inicio" 
            subtitle="Segundo Projeto - Cadastro de Usuários"/>
        <Footer />
    </div>