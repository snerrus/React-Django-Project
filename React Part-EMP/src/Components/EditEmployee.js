import React, { Component } from 'react';
import axios from 'axios';

const customStyle = {
  width: '300px',
  margin: '0 auto'
}

class EditEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      phone: ''
    }
  }

  componentDidMount = () => {
    this.getEmployeeById();
  }

  // To get employee based on ID
  getEmployeeById() {
    axios.post('http://localhost:8000/editdetails/' , {id: this.props.match.params.id})
      .then((response) => {
        this.setState({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          phone: response.data.phone
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // To update the record on submit
  handleSubmit = (event) => {
    event.preventDefault();
    const { firstname, lastname, email, phone } = this.state;
    axios.post('http://127.0.0.1:8000/updateemployees/', {
      id: this.props.match.params.id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
    })
      .then((response) => {
        console.log(response);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log("data on edit", this.props.match.params.id, this.state)
    return (
      <div className="container">
        <form style={customStyle} onSubmit={this.handleSubmit}>
          <label>
            First Name
            <input
              name="firstname"
              type="text"
              value={this.state.firstname}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Last Name
            <input
              name="lastname"
              type="text"
              value={this.state.lastname}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Email
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Phone No
            <input
              name="phone"
              type="text"
              value={this.state.phone}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <br />
          <input
            type="submit"
            value="submit"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}

export default EditEmployee;
