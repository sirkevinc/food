import React from 'react';
import axios from 'axios';

import {
  Link,
} from "react-router-dom";

class Restaurants extends React.Component {
  state = {
    restaurants: null,
  }

  componentDidMount() {
    this.getRestaurants();
  }


  getRestaurants = () => {
    // const location = this.props.location;
    const latitude = this.props.latitude;
    const longitude = this.props.longitude;
    const URL = `https://trackapi.nutritionix.com/v2/locations?ll=${latitude},${longitude}&distance=1000m&limit=15`;
    // const exampleURL = 'https://trackapi.nutritionix.com/v2/locations?ll=38.89814,-77.029446&distance=1000m&limit=5';
    const appId = process.env.REACT_APP_APPID;
    const appKey = process.env.REACT_APP_APPKEY;
    const headers = { headers: {'x-app-id': appId, 'x-app-key': appKey} };

    axios.get(URL,
      headers
    )
      .then((response) => {
        const restaurantInfo = response.data.locations
        this.setState({ restaurants: restaurantInfo });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  kmToMi = (distanceKM) => {
    return parseFloat(distanceKM * 0.621371).toFixed(2);
  }

  render() {
    return (
      <div>
        {!this.state.restaurants ? 
        <div>Loading...</div> : 
        <div className="restaurants__container">
          <p className="restaurants__message">
            Displaying restaurants near: {this.props.zipCode}
          </p>
          <p className="restaurants__message">
            Please choose a restaurant
          </p>
          <ul className="restaurants__list">
          {this.state.restaurants.map((restaurant) => {
            return (
              <li className="restaurants__info" key={restaurant.id}>
                <Link 
                  className="restaurants__link"
                  to={{
                  pathname: `/restaurant/${restaurant.name}`,
                  state: {
                    name: restaurant.name,
                    address: restaurant.address,
                    city: restaurant.city,
                    distance: this.kmToMi(restaurant.distance_km),
                    maxCalories: this.props.calories,
                  }
                }}
                >
                  <h2>{restaurant.name}</h2>
                  <p>Address: {restaurant.address}</p>
                  <p>City: {restaurant.city}</p>
                  <p>Distance (mi): {this.kmToMi(restaurant.distance_km)}</p>
                </Link>
              </li>
            )
          })}
          </ul>
        </div>}
      </div>
    )
  }
}

export default Restaurants;