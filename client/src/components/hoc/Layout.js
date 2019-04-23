import React, { Component } from 'react'

class Layout extends Component {
  render() {
    return (
      <div>
        Header Here
        <div className='page_container'>
            {this.props.children}
        </div>
        Footer here
      </div>
    )
  }
}

export default Layout;
