import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import Axios from 'axios';

class ApiGithub extends Component {
    constructor () {
        super();
        this.state = {
            github: []
        };
        this.buscar = this.buscar.bind(this);
    }


    buscar(){
        let usuario = document.getElementById("user").value;
        Axios.get('https://api.github.com/users/'+usuario)
        .then(res => {
            Axios.get(res.data.repos_url)
            .then(res => {
                console.log(JSON.stringify(res,null,4))
                this.setState({ github: res.data});
            })
            .catch(err => console.log("Error 2"));
        })
        .catch(err => console.log("Error 1"));
    }

    render () {
        return(
            <div>
                <Form>
                    <FormGroup>
                    <Label for="user">Usuario de GitHub</Label>
                    <Input type="text" name="user" id="user" placeholder="Usuario de GitHub" />
                    </FormGroup>
                    <Button color="primary" onClick={this.buscar}>Buscar</Button>
                </Form>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Lenguaje</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.github.map( cell => { 
                            return <tr><td key={cell.name}>{cell.name}</td><td key={cell.description}>{cell.description}</td><td key={cell.language}>{cell.language}</td><td key={cell.html_url}><Button outline color="success" href={cell.html_url} size="sm" block target="_blank">Ir a {cell.name}</Button></td></tr>
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ApiGithub;