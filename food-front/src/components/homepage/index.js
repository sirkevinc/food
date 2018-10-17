import React from 'react';

import Location from '../location';
import Calories from '../calories';
import Restaurants from '../restaurants';

let values = {}

class Homepage extends React.Component {
  state = {
    step: 1,
    restaurants: null,
    zipCode: '',
    latitude: '',
    longitude: '',
    calories: null,
  }

  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  }

  saveValues = (data) => {
    values = Object.assign(values, data);
    this.setState({ ...this.state, 
      zipCode: values.zipCode,
      latitude: values.latitude,
      longitude: values.longitude,
      calories: values.calories
    })
  }

  stepSwitch = () => {
    switch(this.state.step) {
      case 1:
        return <Location
          nextStep={this.nextStep}
          saveValues={this.saveValues}
        />;
      case 2:
        return <Calories
          nextStep={this.nextStep}
          saveValues={this.saveValues}
        />;
      case 3:
        return <Restaurants 
        latitude={this.state.latitude}
        longitude={this.state.longitude}
        zipCode={this.state.zipCode}
        calories={this.state.calories}
        />
      default:
        return <Homepage />;
    }
  }
  
  render() {
    console.log(process.env.REACT_APP_API_ID)
    console.log(process.env.REACT_APP_API_KEY)
    console.log(process.env.REACT_APP_LOCATION_NAME)
    return (
      <div className="app-container">
        {this.state.step === 1 ?
        <p className="homepage__welcome">
        Welcome to Fast Calories!
        </p>
        :
        null
        }
        {this.stepSwitch()}
      </div>
    )
  }
}

export default Homepage;