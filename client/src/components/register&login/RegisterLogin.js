import React from 'react';
import MyButton from '../utilities/MyButton.js';
import Login from './Login.js';

const RegisterLogin = () => {
  return (
    <div className="page-wrapper" >
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
              id est laborum.</p>
            <MyButton
              type="default"
              title="creat an account"
              linkTo="/register"
              addStyles={{
                margin:'10px 0 0 0'
              }}
            />
          </div>
          <div className="right">
            <h2>Registered Costumers</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterLogin;
