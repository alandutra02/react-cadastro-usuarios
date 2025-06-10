import React from "react";
import './Header.css';

/* d-none é para sumir com os cabeçalhos para dispositivos celulares. d-sm-flex é para dispositivos medios para cima. flex-column que define a orientação na vertical, o padrão é flex-row, então definimos */
/* fa quer dizer font-awesome, que também tem ícones. fa-${props.icon} vai receber o conteudo de props.icon, que é "home". Então ficará "fa-home" o que vai gerar o icone da casinha (home)*/ 
/* props.title vai receber a palavra início, que foi definida em App.jsx*/
export default props =>
    <header className="header d-none d-sm-flex flex-column">
        <h1 className="mt-3">
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>