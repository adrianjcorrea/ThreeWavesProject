import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  componentDidMount() {
    axios.get('/api/products/getBrands').then(response => {
      console.log(response);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Three waves Client
        </header>
      </div>
    );
  }  
}

export default App;
