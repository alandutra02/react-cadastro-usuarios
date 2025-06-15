import React, { Component } from "react";
import Main from "../template/Main";
import axios from 'axios'

const headerProps = {
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

    componentDidMount() { // componentDidMount() é nativo do React e chamado automaticamente após o componente ser renderizado na tela pela primeira vez, o que garante que o DOM está pronto e que você pode fazer chamadas assíncronas com segurança.
        axios(baseUrl).then(resp => { // aqui será feito um get em cima da url
            this.setState({list: resp.data})
            }) 
    }

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

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user) // unshift coloca o elemento na primeira posição do array, então o usuário incluído ou alterado vai entra na primeira posição
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

    load(user) { // carrega os usuários em uma lista
        this.setState({ user })
    }

    remove(user) { // remove usuários
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ms-2" //ms(margin start - bootstrap5) no lugar do ml para margin left (bootstrap4)
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}