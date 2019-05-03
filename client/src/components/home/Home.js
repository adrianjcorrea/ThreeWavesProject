import React, { Component } from 'react';

 class Home extends Component {
   constructor() {
     super();
      this.state = {
        data: []
      }
   }


   componentDidMount() {
  }
  render() {
    const home = 'This is my Home Page';
    console.log(this.state.data)
    return (
      <div>
        {home}
      </div>
    )
  }
}

export default Home;
