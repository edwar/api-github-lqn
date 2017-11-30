import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import ApiGithub from './ApiGithub';
import { 
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardDeck,
  CardSubtitle,
  CardBody
} from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
    .then(res => {console.log("Sesión cerrada")})
    .catch(err => console.log(`Error ${err.code}: ${err.message}`));
  }



  renderLogin(){
    if (this.state.user){
      //Si hay un usuario con sesion activa
      return(
        <CardDeck>
          <Card>
            <CardImg top width="50%" src={this.state.user.photoURL} alt={this.state.user.displayName} />
            <CardBody>
              <CardTitle>{this.state.user.displayName}</CardTitle>
              <CardSubtitle>{this.state.user.email}</CardSubtitle>
              <Button color="danger" onClick={this.logout}>Salir</Button>
            </CardBody>
          </Card>
        </CardDeck>
      );
    }else{
      //De lo contrario
      return(
        <Button color="success" onClick={this.login}>Login con google</Button>
      );
    }
  }

  render(){
    return(
      <div className="App">
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Api GitHub LQN</NavbarBrand>
        </Navbar>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 4, offset: 4 }}>
              {this.renderLogin()}
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <ApiGithub/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
