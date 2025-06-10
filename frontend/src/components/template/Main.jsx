import React from "react";
import './Main.css';
import Header from "./Header";

// Obs: o componente Header está sendo importado. Ele é usado dentro de props com o nome Header. Quando usamos o Header {...props} estamos importando todas as propriedades que foram definidas no arquivo App.js. Essas propriedades são "icon, "title"e "subtitle"
export default props =>
    <>
        <Header {...props} />
        <main className="content">
            Conteúdo
        </main>
    </>