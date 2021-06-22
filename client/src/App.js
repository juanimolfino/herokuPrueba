import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const port = process.env.PORT || 5000;

class App extends Component {
  state = {
    response: {}
  };
  
  componentDidMount() {
    axios.get(`http://localhost:${port}/api/v1/say-something`).then((res) => {
      console.log('soy la respuesta', res)
      const response = res.data;
      this.setState({response});
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello from the frontend!</h1>
        <h1>{this.state.response.body}</h1>
      </div>
    );
  }
}

export default App;

// Llamar a la API desde el frontend de React
// Para realizar la solicitud de API desde el cliente, utilizaremos el cliente HTTP 'axios'.
// Axios es una biblioteca Javascript utilizada para realizar peticiones HTTP desde Node.js o XMLHttpRequests desde el navegador que también soporta la ES6 Promise API.