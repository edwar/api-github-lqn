import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  CardImg, 
  CardTitle, 
  CardText, 
  CardDeck,
  CardSubtitle, 
  CardBody 
} from 'reactstrap';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.renderLogin = this.renderLogin.bind(this);

  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  login(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(res => console.log(JSON.stringify(res.user, null, 4)))
    .catch(err => console.log(`Error ${err.code}: ${err.message}`));
  }

  logout(){
    firebase.auth().signOut()
    .then(res => {console.log("sesión cerrada")})
    .catch(err => console.log(`Error ${err.code}: ${err.message}`));
  }

  renderLogin(){
    if (this.state.user){
      //Si hay un usuario con sesion activa
      return(
        <CardDeck>
          <Card>
            <CardImg top width="100%" src={this.state.user.photoURL} alt={this.state.user.displayName} />
            <CardBody>
              <CardTitle>{this.state.user.displayName}</CardTitle>
              <CardSubtitle>{this.state.user.email}</CardSubtitle>
              <Button onClick={this.logout}>Salir</Button>
            </CardBody>
          </Card>
        </CardDeck>
      );
    }else{
      //De lo contrario
      return(
        <button onClick={this.login}>Login con google</button>
      );
    }
  }

  render(){
    return(
      <div className="App">
        <Container>
          <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            {this.renderLogin()}
          </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
