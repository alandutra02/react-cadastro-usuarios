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

    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user) // unshift coloca o elemento na primeira posição do array, então o usuário incluído ou alterado vai entra na primeira posição
        return list
    }

    updateField(event) { // função para alterar campos do formulário
        const user = { ...this.state.user} // fazemos um clone do estatdo do objeto para não manipular diretamente o objeto original. Essa é uma filosofia do React. Se alterar um objeto diretamente sem fazer o spread, o React pode não detectar a mudança no objeto e não fazer o render porque ele não consegue fazer a comparação entre o estado original e o novo estado porque a referência do estado antigo é perdida ao se alterar o objeto diretamente. 
        user[event.target.name] = event.target.value
        this.setState({ user })
    }
    
    renderForm() {
        return (<div className="form">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" className="form-control" 
                            name="name"
                            value={this.state.user.name}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome..." />
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="text" className="type form-control"
                        name="email"
                        value={this.state.user.email}
                        onChange={e => this.updateField(e)}
                        placeholder="Digite o e-mail..." />
                    </div>
                </div>
            </div>

            <hr />
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={e => this.save(e)}>
                        Salvar
                    </button>
                    <button className="btn btn-sercondary ml-2"
                        onClick={e => this.clear(e)}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>

        )
    }

    render() {
        return (
            <Main {...headrProps}>
                {this.renderForm()}
            </Main>
        )
    }
}