import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormText, FormFeedback,
  Radio, Alert,
} from 'reactstrap';
import axios from 'axios';
import { RadioGroup, RadioButton} from 'react-radio-buttons';

export default class PatientDetails extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      salutation: null,  
      username: null,
      age: null,
      aadhar: '',
      male: null,
      female: null,
      validate: {
        emailState: '',
      },
      bday: null,
      visible: false,
      info: null,
      appointmentdate: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
    this.setState({
      visible: ! this.state.visible
    });
  }

  mySetValue = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  myTextHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    if (val === "MR") {
        this.setState({
          male: true 
        });
        this.setState({
          female: false 
        });
    }
    else if (val === "MS") {
        this.setState({
          female: true 
        });
        this.setState({
          male: false 
        });
    }
    else if (val === "MRS") {
        this.setState({
          female: true 
        });
        this.setState({
          male: false 
        });
    }
    this.setState({[nam]: val});
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    if (nam === "age") {
      if (!Number(val)) {
        alert("Your age must be a number");
      }
    }
    this.setState({[nam]: val});
    this.setState({[nam]: 10});
  }
  mydobHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    var today = new Date();
    var birthDate = new Date(val);
    var age1 = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age1 = age1 - 1;
    }
    this.setState({
      age: age1 
    });
    this.setState({
      nam: val 
    });
  }
   mySubmitHandler = (event) => {
    const details = {
                username: this.state.username,
                dob: this.state.dob,
                age: this.state.age,
                appointmentdate: this.state.appointmentdate,
                aadharnumber: this.state.aadharnumber
    };
    if (this.state.male) {
      details['gender'] = 'MALE';
    }
    else {
      details['female'] = 'FEMALE';
    }

    if (!this.state.salutation) {
      this.setState({
      visible: ! this.state.visible,
      info: "Please enter salutation"
      }); 
      event.preventDefault();
    }
    else if (!this.state.username) {
      this.setState({
      visible: ! this.state.visible,
      info: "Please enter username"
      }); 
      event.preventDefault();
    }
    else if (!this.state.bday) {
      this.setState({
      visible: ! this.state.visible,
      info: "Please enter dob"
      }); 
      event.preventDefault();
    }
    else if (!this.state.appointmentdate) {
      this.setState({
      visible: ! this.state.visible,
      info: "Please enter appointment date"
      }); 
      event.preventDefault();
    }
    else if (!this.state.aadhar) {
      this.setState({
      visible: ! this.state.visible,
      info: "Please enter aadhar Number"
      }); 
      event.preventDefault();
    }
    else {
      fetch('http://127.0.0.1:4000/patients/add', {
      method: 'post',
      body: JSON.stringify(details)
      })
      .then(response => {
         console.log(response) 
      });
      
      alert("You are submitting for the User" + this.state.username);
    }
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container className="App">
        <h2>Patient Details</h2>
        <Form className="form" onSubmit={ (e) => this.mySubmitHandler(e) }>
          <Col>
            <Alert color="primary" isOpen={this.state.visible} toggle={this.toggle.bind(this)}>{this.state.info}</Alert>
            <FormGroup>
              <Label>Salutation</Label>
              <Input
                type="text"
                name="salutation"
                id="salutation"
                placeholder="MR/MRS/MS"
                value={this.state.salutation}
                maxlength="4" 
                size="4"
                onChange={ (e) => {
                            this.myTextHandler(e)
                            this.handleChange(e)
                          } }
              />
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="John"
                value={this.state.username}
                onChange={ (e) => {
                            this.handleChange(e)
                            this.mySetValue(e)

                          } }
              />
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <RadioGroup onChange={ this.onChange } horizontal>
                <RadioButton value="male" checked={this.state.male}>
                  Male
                </RadioButton>
                <RadioButton value="female" checked={this.state.female}>
                  Female
                </RadioButton>
              </RadioGroup>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Date Of Birth</Label>
              <Input
                type="date"
                name="bday"
                id="bday"
                value={this.state.bday}
                onChange={ (e) => {
                            this.mydobHandler(e)
                            this.handleChange(e)
                            this.mySetValue(e)
                          } }
              />
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Age</Label>
              <Input
                type="text"
                name="age"
                id="age"
                value={this.state.age}
                readOnly={true}
              />
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>AppoinmentDate</Label>
              <Input
                type="date"
                name="appointmentdate"
                id="appointmentdate"
                value={this.state.appointmentdate}
                onChange={ (e) => {
                            this.mySetValue(e)
                            this.handleChange(e)
                          } }
              />
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>AadharNumber</Label>
              <Input
                type="text"
                name="aadhar"
                id="aadhar"
                value={this.state.aadhar}
                onChange={ (e) => {
                            this.mySetValue(e)
                            this.handleChange(e)
                          } }
              />
            </FormGroup>
          </Col>
          <Button>Submit</Button>
      </Form>
      </Container>
    );
  }
}