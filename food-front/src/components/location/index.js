import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const StyledButton = styled(Button)`
  && {
  background-color: #3f51b5;
  border-radius: 5px;
  color: #fff;
  margin: 0 1em;
  padding: 0.25em 1em;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 128, .2);
  &:hover {

  }
  }
`

class Location extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    zipCode: '',
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getLocationZipCode(this.state.zipCode);
  }

  getLocationZipCode = (zipCode) => {
    const username = 'Gen3tix';
    const URL = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${zipCode}&country=US&username=${username}`

    axios.get(URL)
      .then((response) => {
        const locationData = response.data.postalCodes[0];
        const latitude = locationData.lat;
        const longitude = locationData.lng;

        this.setState({ latitude, longitude });
        this.props.saveValues(this.state);
        this.props.nextStep();
      })
      .catch((error) => {
        console.error(error);
      })
  }

  geoFindMe = () => {
    if (!navigator.geolocation){
      return;
    }
  
    const success = (position) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      this.setState({ latitude, longitude });
    }
  
    const error = () => {
      console.error('error')
    }
  
    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    return (
      <div className="location__container">
        <p className="location__message">Please enter your zip code</p>
        <form className="location__form"onSubmit={this.handleSubmit}>
          <TextField type="text" name='zipCode' onChange={this.handleChange} />
          <StyledButton type="submit">Submit</StyledButton>
        </form> 
      </div>
    )
  }
}

// example endpoint: https://trackapi.nutritionix.com/v2/locations?ll=38.89814,-77.029446&distance=50m&limit=1

export default Location;