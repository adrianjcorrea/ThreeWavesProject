import React, { Component } from 'react';
import FormField from '../utilities/FormField.js';
import {update} from '../utilities/ActionsField.js';

import { connect } from 'react-redux';

class Login extends Component {

  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'enter your email'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage:''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage:''
      }
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'login');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }


  formOnSubmit = () => {
    return alert('hello');
  }

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={(event) => this.formOnSubmit(event)}>
          <FormField
            id={ 'email' }
            formdata={ this.state.formData.email }
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={ 'password' }
            formdata={ this.state.formData.password }
            change={(element) => this.updateForm(element)}
          />
        </form>
      </div>
    )
  }
}

export default connect()(Login);
