import React, { Component } from 'react';
import Header from '../header&footer/Header.js';
import Footer from '../header&footer/Footer.js';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='page_container'>
            {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Layout;
