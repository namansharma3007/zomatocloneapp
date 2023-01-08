import React, { useEffect, useState } from 'react'
import '../../styles/Filter.css'
import Header from '../Common/Header'
import { Link,useParams } from 'react-router-dom';

export default function Filter() {

    const [restaurants, setRestaurants] = useState([])

    const [pageCount, setPageCount] = useState(0)

    const [locations, setlocationDropdown] = useState([])

    const [currentPage, setCurrentPage] = useState(1);

    const [headingLocation, setheadingLocation] = useState("Delhi")

    // reading from url
    let { mealType } = useParams()

    const [filter, setFilter] = useState({
        city_id: '',
        cuisine: [],
        lcost: '',
        hcost: '',
        sort: 1
        // type: [`${mealType.toLowerCase()}`]
    })

    
    useEffect(() => {
        fetch(`https://zomato-clone-api-production.up.railway.app/restaurants/filter/${currentPage}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filter)
            }).then(response => response.json())
                .then(data => {setRestaurants(data.data); setPageCount(data.totalRecords/2)})
    }, [filter,currentPage]);

    useEffect(()=>{
        fetch(`https://zomato-clone-api-production.up.railway.app/location`,
        {
            method:'GET'
        }).then(response => response.json())
        .then(data => setlocationDropdown(data.data))
    },[])


    const fetchRestaurants = (e) =>{
        filter.city_id = e.target.value
        // console.log(e.target.key)
        let cityNames = {1:"Delhi",2:"Pune",3:'Bangalore',4:"Chennai",5:"Mumbai",6:"Chandigarh"}
        setheadingLocation(cityNames[e.target.value])        
        setFilter({...filter})
    }

    const handleSort=(sort)=>{
        filter.sort=sort;
        setFilter({...filter});
    }

    const handleCost=(lcost,hcost)=>{
        filter.lcost=lcost;
        filter.hcost=hcost;
        setFilter({...filter});
    }

    const handleCuisine=(e)=>{ 
        if(e.target.checked)
            filter.cuisine.push(e.target.name);
        else {
            let index = filter.cuisine.indexOf(e.target.name);
            if(index >-1)
                filter.cuisine.splice(index,1)
        }        
        setFilter({...filter});
    }

    //pagination logic
    const paginationItems = [];
    for(let i=1;i<=pageCount;i++)
        paginationItems[i] = <a href="#" key={i} onClick={()=>setCurrentPage(i)}>{i}</a>

    const locationDropdown = 
    locations.length && 
    locations.map(item => 
    <option key={item.name} value={item.city_id}>{item.name}
    </option>)

    

    return (
        <div>
            <Header />
            <h1 className='heading'>{mealType} Places in {headingLocation}</h1>
            <div className="lowerBox">


                <div className="filter">
                    <p>Filters</p>
                    <p>Select Location</p>
                    <select onChange={(e)=>fetchRestaurants(e)}>
                    <option value="1">Select</option>
                        {locationDropdown}
                    </select>
                    <p>Cuisine</p>
                    <span>
                        <input type="checkbox" name="North Indian" onChange={(e)=>handleCuisine(e)} /> North Indian
                        <br />
                        <input type="checkbox" name="South Indian" onChange={(e)=>handleCuisine(e)} /> South India
                        <br />
                        <input type="checkbox" name="Chinese" onChange={(e)=>handleCuisine(e)} /> Chinese
                        <br />
                        <input type="checkbox" name="Fast Food" onChange={(e)=>handleCuisine(e)} /> Fast Food
                        <br />
                        <input type="checkbox" name="Street Food" onChange={(e)=>handleCuisine(e)} /> Street Food
                        <br />
                    </span>
                    <p>Cost For Two</p>
                    <span>
                        <input name="cost" type="radio"  onChange={() => handleCost(0,500)} /> Less than &#8377; 500
                        <br />
                        <input name="cost" type="radio" onChange={() => handleCost(500,1000)} /> &#8377; 500 to &#8377; 1000
                        <br />
                        <input name="cost" type="radio"onChange={() => handleCost(1000,1500)}  /> &#8377; 1000 to &#8377; 1500
                        <br />
                        <input name="cost" type="radio" onChange={() => handleCost(1500,2000)} /> &#8377; 1500 to &#8377; 2000
                        <br />
                        <input name="cost" type="radio" onChange={() => handleCost(2000,5000)} /> &#8377; 2000+
                        <br />
                    </span>
                    <p>Sort</p>
                    <span>
                        <input type="radio" name="sort" checked={filter.sort==1} onChange={() => handleSort(1)} /> Price low to high
                        <br />
                        <input type="radio" name="sort" checked={filter.sort==-1} onChange={() => handleSort(-1)} /> Price high to low
                    </span>
                </div>

                <div className="rightBox">
                    {
                        restaurants.length > 0 ? restaurants.map((item, index) =>
                            <Link className="searchResult" key={index} to={`/details/${item.name}`}>

                                <img src={item.thumb} />
                                <span className="shopAddress">
                                    <h1>{item.name}</h1>
                                    <p>{item.locality}</p>
                                    <p>{item.address}</p>
                                </span>
                                <div className='line'></div>
                                <div>

                                    <div className='cuisine'><b>CUISINE: </b>{item.Cuisine.length && item.Cuisine.map((item) => item.name + " ")}</div>
                                    <div className='price'><b>COST FOR TWO: </b>&#x20B9; {item.cost}</div>
                                </div>

                            </Link>
                        ) : <div className='noData'>No Data Found</div>
                    }


                    <div className="pagination">
                        <a href='#'>&laquo;</a>
                        {paginationItems}
                        <a href='#'>&raquo;</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
