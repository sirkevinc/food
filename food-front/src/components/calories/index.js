import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const StyledButton = styled(Button)`
  && {
    background-color: #3f51b5;
    border-radius: 5px;
    color: #fff;
    margin: 0 1em;
    padding: 0.25em 1em;
    box-shadow: 0 3px 5px 2px rgba(0, 0, 128, .2);
  }
`

class Calories extends React.Component {
  state = {
    calories: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveValues(this.state);
    this.props.nextStep();
  }

  render() {
    console.log(this.props)
    return (
      <div className="calories__container">
        <p className="calories__message">
        Please enter the maximum amount of calories
        <br /> 
        that you would like to remain under:
        </p>
        <form className="calories__form" onSubmit={this.handleSubmit}>
          <TextField type="text" name="calories" onChange={this.handleChange}></TextField>
          <StyledButton type="submit">Submit</StyledButton>
        </form>
      </div>
    )
  }
}

export default Calories;