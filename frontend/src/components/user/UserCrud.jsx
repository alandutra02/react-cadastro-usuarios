import React, { Component } from "react";
import Main from "../template/Main";

const headrProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, listar, Alterar e Excluir!'
}

export default class UserCrud extends Component {
    render() {
        return (
            <Main {...headrProps}>
                Cadastro de Usuário
            </Main>
        )
    }
}