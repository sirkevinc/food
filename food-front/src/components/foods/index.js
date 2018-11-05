import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

class Foods extends React.Component {
  state = {
    address: this.props.location.state.address,
    name: this.props.location.state.name,
    distance: this.props.location.state.distance,
    zipCode: this.props.location.state.zipCode,
    foods: null,
    meal: null,
    maxCalories: this.props.location.state.maxCalories,
  }

  componentDidMount() {
    this.getFoods();
  }

  getFoods = () => {
    // const exampleURL = 'https://trackapi.nutritionix.com/v2/search/instant?query=dominos';
    const URL = `https://trackapi.nutritionix.com/v2/search/instant?query=${this.state.name}`;
    const appId = process.env.REACT_APP_APPID;
    const appKey = process.env.REACT_APP_APPKEY;
    const headers = { headers: {'x-app-id': appId, 'x-app-key': appKey} };

    axios.get(URL, headers)
      .then((response) => {
        // const foods = response.data.branded.concat(response.data.common);
        const foods = response.data.branded;
        this.setState({ foods });
      })
      .catch((error) => {
        console.error(error);
      })
  }


  createMeal = (foods, calorieLimit) => {
    let currentMeal = {
      totalCalories: 0,
      meal: []
    };
    
    const randomFoods = this.randomize(foods);

    randomFoods.forEach((food) => {
      if (currentMeal.totalCalories + food.nf_calories < calorieLimit) {
        currentMeal.totalCalories += food.nf_calories;
        currentMeal.meal.push(food);
      }
    })
    return currentMeal;
  }

  renderMeal = (meal) => {
    return (
      <div>
        {this.createMeal(this.state.foods, this.state.maxCalories).meal.map((food) => {
          return (
            <li className="meal-item" key={food.nix_item_id}>
              <h4>Item name: {food.food_name}</h4>
              <h4>Calories: {food.nf_calories}</h4>
            </li>
          )
        })}
        <div className="meal-calories">
          <h4>Total Calories: {meal.totalCalories}</h4>
        </div>
      </div>
    )
  }

  randomize = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  render() {
    return (
      <Router>
        <div className="foods__container">
          <div className="foods__message">
            <h3>Meal containing fewer than {this.state.maxCalories} calories at:</h3>
          </div>
          <div className="foods__restaurant-info">
            <h3>{this.state.name}</h3>
            <h5>Address: {this.state.address}</h5>
            <h5>Distance: {this.state.distance} mi</h5>
          </div>
          {!this.state.foods ? <div>Loading foods...</div> :
          // <ul>
          //   {this.state.foods.map((food) => {
          //     return(
          //       <li key={food.nix_item_id}>
          //         <p>Name: {food.brand_name_item_name}</p>
          //         <p>Calories: {food.nf_calories}</p>
          //       </li>
          //     )
          //   })}
          // </ul>
          // <div>
          //   {this.createMeal(this.state.foods, this.state.maxCalories).meal.map((food) => {
          //     return (
          //       <div>
          //         <h3>Item: {food.food_name}</h3>
          //         <h3>Calories: {food.nf_calories}</h3>
          //       </div>
          //     )
          //   })}
          // </div>
          <div className="foods__list">
            {this.renderMeal(this.createMeal(this.state.foods, this.state.maxCalories))}
          </div>
          }
        </div>
      </Router>
    )
  }
}

export default Foods;