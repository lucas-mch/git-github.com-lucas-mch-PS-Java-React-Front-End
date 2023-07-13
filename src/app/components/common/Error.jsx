import React, { Component } from 'react'

export class Error extends Component {
    render() {
        return (
            <div id='wrapper'>
               <div className="alert alert-danger" role="alert" id='container'>
                    {this.props.message + ' ' + this.props.caminho } <br/>
                    Por favor, certifique-se que a aplicação Springboot esteja rodando corretamente.
                </div>
            </div>
        )
    }
}

export default Error;