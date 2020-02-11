import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Autocomplete from './react-autocomplete';
import TextField from '../node_modules/react-textfield';
import { getStocks, matchStocks } from './data';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age: null,
      aadhar: '',
      male: null,
      female: null
    };
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
  }
   mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.state.username);
  }
  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
      <fieldset>
      <legend>Personal information:</legend>
      
      <p>Enter your name:</p>
      <input type="text" name="salutation" maxlength="4" size="4" onChange={this.myTextHandler}/> 
      <input
        type='text'
        name='username'
        onChange={this.myChangeHandler}
      />
      <p>Gender:</p>
      <input type="radio" name="gender" value="male" checked={this.state.male}/> Male
      <input type="radio" name="gender" value="female" checked={this.state.female}/> Female
      <p>Enter your DOB:</p>
      <input
        type='date'
        name='bday'
        onChange={this.mydobHandler}
      />
      <p>Enter your age:</p>
      <input
        type='text'
        name='age'
        onChange={this.myChangeHandler}
        value={this.state.age}
        readOnly={true}
      />
      <p>Enter your AppoinmentDate:</p>
      <input
        type='date'
        name='appointmentdate'
      />
      <p>Enter your AadharNumber:</p>
      <input
        type='text'
        name='aadhar'
        value={this.state.aadhar}
      />
      <br/>
      </fieldset>
      <fieldset>
      <legend>Clinical information:</legend>
      <p>Enter Select:</p>
      <Autocomplete
          value={ this.state.value }
          inputProps={{ id: 'states-autocomplete' }}
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          items={ getStocks() }
          getItemValue={ item => item.name }
          shouldItemRender={ matchStocks }
          onChange={(event, value) => this.setState({ value }) }
          onSelect={ value => this.setState({ value }) }
          renderMenu={ children => (
            <div className = "menu">
              { children }
            </div>
          )}
          renderItem={ (item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={ item.abbr } >
              { item.name }
            </div>
          )}
        />
      </fieldset>
      <input
        type='submit' display = "none"
      />
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
