import React, { Component } from 'react'
import '../../styles/Wallpaper.css'
import homepageimg from '../../Assets/homepageimg.png'
import { Link } from 'react-router-dom'
import Header from '../Common/Header'

export default class Wallpaper extends Component {

  constructor() {
    super();
    this.state = {
      location: [],
      restaurants: []
    }
  }
  fetchRestaurants = (event) => {
    // console.log(event.target.value)
    fetch(`https://zomato-clone-api-production.up.railway.app/restaurants/${event.target.value}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => this.setState({ restaurants: data.data }))
  }

  componentDidMount() {
    fetch('https://zomato-clone-api-production.up.railway.app/location', { method: 'GET' })
      .then(response => response.json())
      .then(data => this.setState({location: data.data}))
  }
  render() {

    const locationList = this.state.location.length && this.state.location.map(item => 
    <option key={item.name} value={item.city_id}>{item.name}
    </option>)

    const restaurantsList = this.state.restaurants.length &&
      <ul>{
        this.state.restaurants.map(item =>
          <li key={item.name} className='restaurants-list'>
            <Link to={`/details/${item.name}`} className="links">
              {item.name}
            </Link>
          </li>)
      }
      </ul>

      // console.log(this.state.restaurantsList);


    return (

      <div>
        <Header/>
        
          <img src={homepageimg} width='100%' height='450' />

          <div className="logo">
            <p>e!</p>
          </div>
          <div className="headings">
            Find the best restaurants, cafes, bars
          </div>
          <div className="locationSelector">
            <select className="locationDropdown" onChange={this.fetchRestaurants}>
              <option value="0">Select</option>
              {locationList}
            </select>
            <div id="notebooks" >
              <input className="restaurantsinput" type="text" placeholder="Search Restaurant" />
              {restaurantsList}
            </div>

          </div>
      
      </div>

    )
  }
}
