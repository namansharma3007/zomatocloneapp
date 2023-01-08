import React, { Component } from 'react'
import '../../styles/Wallpaper.css';
import Mealtype from './Mealtype';


export default class Quicksearch extends Component {

  constructor() {
    super();
    this.state = {
      mealTypes: []
    }
  }

  componentDidMount() {
    fetch('https://zomato-clone-api-production.up.railway.app/mealtype', { method: 'GET' })
      .then(response => response.json())
      .then(data => this.setState({ mealTypes: data.data }))
  }
  render() {
    const mealTypesList = this.state.mealTypes.length && this.state.mealTypes.map(item => <Mealtype key={item.name} item={item}></Mealtype>)
    return (

      <div>
        <div className="quicksearch">
          <p className="quicksearchHeading">
            Quick Searches
          </p>
          <p className="quicksearchSubHeading">
            Discover restaurants by type of meal
          </p>
          <div className="container-fluid lower-container">
            <div className="row">

              {mealTypesList}
            </div>
          </div>
        </div>
      </div>


    )
  }
}
