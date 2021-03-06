import React, { Component } from "react";
import Input from "./input";

class Form extends Component {
  validate = () => {
    let emailvalid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { username, message, email = "1@gmail.com" } = this.state.data;
    const errors = {};
    if (emailvalid.test(email) === false)
      errors.email = "Email-address is not valid";
    if (username.trim() === "") errors.username = "Your name is required";
    if (username.length <= 3)
      return (errors.username = "Your name is should be gater than 3 letter.");
    if (message.trim() === "") errors.message = "message is required";
    if (message.length <= 8)
      return (errors.message = "message must be gater than 8 charecter");
    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateChange = ({ name, value }) => {
    if (name === "email") {
      let emailvalid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (emailvalid.test(value) === false) return "Email-address is not valid";
    }

    if (name === "username") {
      if (value.length <= 3)
        return "Your name is should be gater than 3 letter.";
    }

    if (name === "message") {
      if (value.length <= 8) return "message must be gater than 8 charecter";
    }
  };

  handleChange = ({ currentTarget: event }) => {
    const errors = { ...this.state.errors };
    const errorMassage = this.validateChange(event);
    if (errorMassage) errors[event.name] = errorMassage;
    else delete errors[event.name];
    const data = { ...this.state.data };
    data[event.name] = event.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        onClick={this.handleSubmit}
        className="slider-btn  "
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type) {
    const { data, errors } = this.state;
    return (
      <Input
        placeholder={label}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        type={type}
        error={errors[name]}
      />
    );
  }
}

export default Form;
