import React, { Component } from "react";
import Main from "../template/Main";
import axios from 'axios'

const headrProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, listar, Alterar e Excluir!'
}

// vamos criar agora o estado inicial do usuário para que quando for cancelar uma operação o estado volte ao estado anterior
const baseUrl = 'http://localhost:3001/Users'
const initialState = {
    user: { name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    // clear() é a função responsável por limpar o formulário quando este estiver preenchido e for clicado o botão cancelar.
    clear() {
        this.setState({ user: initialState.user })
    }

    // em save() vamos definir inclusão que vei ser o post e a alteração que vai ser o put
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl// se o id do usuário existir no backend, ele devolve a url completa com localhost:3001/Users/id. Caso o id não esteja setado, vai receber somente a url localhost:3001/Users
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data) //resp.data são os dados retornados pelo JSON no backend
                this.setState({ user: initialState.user, list}) // initialState limpa o usuário, para limpar o formulário e list faz com que a lista seja atualizada. Então aqui depois que clicar no botão salvar, o formulário será limpo e a lista será salva
            })
    }

    render() {
        return (
            <Main {...headrProps}>
                Cadastro de Usuário
            </Main>
        )
    }
}