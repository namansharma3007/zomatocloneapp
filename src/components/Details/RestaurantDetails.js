import React, { useState, useEffect } from 'react'
import Header from '../Common/Header';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useParams } from 'react-router-dom'
import 'react-tabs/style/react-tabs.css';
import '../../styles/Details.css'
import Modal from 'react-modal';

export default function RestaurantDetails() {
  //hooks 
  const [restaurant, setRestaurant] = useState({})
  const [isMenuModalOpen, setMenuModal] = useState(false)
  const [menu, setMenu] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)



  let { rName } = useParams()

  const fetchMenu = () => {
    fetch(`https://zomato-clone-api-production.up.railway.app/menu/${rName}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => setMenu(data.data))
  }

 

  const calAddPrice = (item) => {
    let price = totalPrice + item.itemPrice;
    const count = totalItems + 1
    if (price <= 0 || count <= 0) {
      setTotalPrice(0);
      setTotalItems(0);
    } else {
      setTotalItems(count)
      setTotalPrice(price);
    }

  }

  const calRemovePrice = (item) => {
    let price = totalPrice - item.itemPrice;
    const count = totalItems - 1
    if (price <= 0 || count <= 0) {
      setTotalPrice(0);
      setTotalItems(0);
    } else {
      setTotalPrice(price);
      setTotalItems(count);
    }
  }


  const loadScript = (rpScript) => {

    return new Promise((resolve) => {

      const script = document.createElement("script");
      script.src = rpScript;
      script.onload = () => {
        // console.log('success');
        openRazorpay();
        resolve(true)
      }
      script.onerror = () => {
        console.log('failure');
        resolve(false)
      }
      document.body.appendChild(script)

    })
  }

  const openRazorpay = async () => {
    try {

      // call API that would generate order in the backend
      let orderData;
      orderData = await fetch('https://zomato-clone-api-production.up.railway.app/payment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: totalPrice })
        }).then(resp => resp.json())

      // console.log(orderData)

      const options = {
        key: "rzp_test_GI0Qw059D6XMIc",
        amount: orderData.amount,
        order_id: orderData.id,
        currency: orderData.currency,
        name: 'Zomato food delivery app',

        // prefill: {
        //   email: 'juliet40426@academy.com',
        //   contact: '1234567890'
        // },
        handler: function (response) {
          // console.log(response);
          fetch('https://zomato-clone-api-production.up.railway.app/payment/save',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_orderid: response.razorpay_order_id,
                razorpay_paymentid: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                razorpay_amount: orderData.amount
              })
            }).then(resp => console.log(resp))
        }
      }
      const paymentWindow = new window.Razorpay(options);
      paymentWindow.open();

    } catch (error) {
      console.log(`cannot load payment gateway: ${error}`)
    }
  }
  //lifecycle hooks :componentDidMount and componentDidUpdate
  useEffect(() => {
    fetch(`https://zomato-clone-api-production.up.railway.app/restaurants/details/${rName}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => setRestaurant(data.data))
  }, []) //dependency array as blank this useEffect behaves like componentDidMount

  const { name, thumb, cost, address, Cuisine } = restaurant
  const cuisineList = !(Cuisine == undefined) && Cuisine.length && <ul>{Cuisine.map(item => <li key={item.name}>{item.name}</li>)}</ul>
  return (
    <div>
      <Header />
      <div className='image-restaurant'>
        <img src={thumb} height="400px" width="80%" />
      </div>
      <div className='res-name'>
        <h2>{name}
          <button className='btn btn-danger' style={{ float: 'right' }} onClick={() => { fetchMenu(); setMenuModal(true) }}>Place Online order</button>
        </h2>
      </div>
      <div className='tabs-details'>
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Contact</Tab>
          </TabList>

          <TabPanel>
            <div className='about'>About the place</div>
            <div className='head'>Cuisine</div>
            {cuisineList}
            <div className='head'>Average Cost</div>
            <div className='value'>&#8377; {cost}</div>
          </TabPanel>
          <TabPanel>
            <div className='head'>Phone Number</div>
            <div>+91-12345678</div>
            <div className='head'>{name}</div>
            <div className='value'>{address}</div>
          </TabPanel>
        </Tabs>
      </div>
      <Modal
        isOpen={isMenuModalOpen}
      >
        <div>
          <h2>Menu
            <button onClick={() => setMenuModal(false)} className="btn btn-danger" style={{ float: 'right' }}>X</button>
          </h2>
        </div>
        <div>
          <ul>
            {
              menu.length &&
              menu.map((item, index) => <li key={index}>

                <div>
                  {item.isVeg ? <span className='text-success'>{item.itemName}</span> : <span className='text-danger'>{item.itemName}</span>}

                </div>
                <div>
                  {item.itemPrice}
                </div>
                <div>
                  {item.itemDescription}
                </div>
                <span className='count-buttons'>
                  <button className='btn btn-danger' onClick={() => calRemovePrice(item)}>-</button>
                  <button className='btn btn-primary' onClick={() => calAddPrice(item)}>+</button>
                </span>


              </li>)
            }
          </ul>
          <hr />
          <h3>
            Total Price:&#8377; {totalPrice}
            {/* to steps ot get executed : 1. is to attach js to the current web page 2. call a method from that javascript to see payment window */}
            <button className='btn btn-danger' style={{ float: 'right' }} onClick={() => { setMenuModal(false); loadScript('https://checkout.razorpay.com/v1/checkout.js') }}>Pay now</button>
          </h3>
          <h3>Total Items: <span>{totalItems}</span></h3>
        </div>
      </Modal>
    </div>
  )
}
