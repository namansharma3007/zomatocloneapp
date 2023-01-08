
import React, { useState, useEffect } from 'react'
import '../../styles/Header.css';
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';
import axios from 'axios';



Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function Header() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isCreateAccountOpen, setCreateAccount] = useState(false)
    const [signoutModal, setsignoutModal] = useState(false)

    // for gogle
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);

    const [loginDetails, setLoginDeails] = useState({})

    const [changingName, setchangingName] = useState({
        name: ''
    })


    const [loginCheck, setloginCheck] = useState({
        userName: '',
        password: ''
    })
    const [isLoggedIn, setisLoggedIn] = useState(false)

    // creating username and password and pushing data

    // creating state
    const [userDetails, setuserDetails] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const changeFullName = (event) => {
        userDetails.fullName = event.target.value;
        setuserDetails({ ...userDetails });
    }

    const changeUserName = (event) => {
        userDetails.userName = event.target.value;
        setuserDetails({ ...userDetails });
    }

    const changeEmail = (event) => {
        userDetails.email = event.target.value;
        setuserDetails({ ...userDetails });
    }

    const changePassword = (event) => {
        userDetails.password = event.target.value;
        setuserDetails({ ...userDetails });
    }

    const changeConfirmPassword = (event) => {
        userDetails.confirmPassword = event.target.value;
        setuserDetails({ ...userDetails });
    }


    const onSubmit = (event) => {
        event.preventDefault();

        var options = {};

        try {
            if (userDetails.password === userDetails.confirmPassword) {
                options = {
                    fullName: userDetails.fullName,
                    userName: userDetails.userName,
                    email: userDetails.email,
                    password: userDetails.password
                }

            }
            axios.post('https://zomato-clone-api-production.up.railway.app/userData/createUser', options)

            setCreateAccount(false)
        } catch (error) {
            console.log(error)
            alert('Credentials are wrong')
        }
    }

    const checkUserName = (event) => {
        loginCheck.userName = event.target.value;
        setloginCheck({ ...loginCheck })
    }
    const checkPassword = (event) => {
        loginCheck.password = event.target.value;
        setloginCheck({ ...loginCheck })
    }

    const setNameAndUserName = () => {
        if (loginDetails.data[0].fullName) {

            changingName.name = loginDetails.data[0].fullName
            setchangingName({ ...changingName })
            setisLoggedIn(true)
            setIsLoginModalOpen(false)
            
        } else{
            alert('Credentials are wrong')
        }

    }

    const signOut = ()=>{
       
    }

    // login setup
    const sendUserDataToBackend = async (event) => {
        event.preventDefault();

        var requirements = {};

        try {

            requirements = {
                userName: loginCheck.userName,
                password: loginCheck.password
            }
            // console.log(requirements)
            await axios.post('https://zomato-clone-api-production.up.railway.app/userData/getUser', requirements)
                .then(response => setLoginDeails(response.data))

            setNameAndUserName();



        } catch (error) {
            console.log(error)
        }
    }







    // For facebook

    const responseFacebook = (response) => {
        if(response.length > 0 ){
        console.log("facebook callback response: ", response)
        loginDetails.user_name = response.name;
        loginDetails.picture = response.picture.data.url;
        setLoginDeails({...loginDetails})
        setisLoggedIn(true)
        }
    }
    // console.log(loginDetails)


    //for google

    const handleCallBackGoogle = (response)=>{
        console.log(response)
    }
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        setShowloginButton(false);
        setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };


    return (

        <div className='header'>
            <Link title="Home" className='s-logo' to={`/`}>
                <span>e!</span>
            </Link>

            <div className='login-block'>
                {isLoggedIn ?
                    <div className="afterLoggedIn">
                        <span >{changingName.name}</span>
                        <i onClick={() => setsignoutModal(true)} class="bi bi-box-arrow-right" id="exit-post-login" title="Sign Out"></i>
                    </div>

                    :
                    <div>
                        <span className='login' onClick={() => setIsLoginModalOpen(true)}>LogIn</span>
                        <span className='signUp' onClick={() => setCreateAccount(true)}>Create An Account</span>
                    </div>
                }
            </div>
            <Modal
                isOpen={isLoginModalOpen}
                style={customStyles}
            >
                <div>
                    <h2>Login
                        <button className='btn btn-danger' style={{ float: 'right' }} onClick={() => setIsLoginModalOpen(false)}>X</button>
                    </h2>
                </div>
                {/* three different options for login 1. usename & pwd  2. use facebook account 3.use google account */}
                <div>
                    <form onSubmit={sendUserDataToBackend}>
                        <input type="text"
                            placeholder="Username"
                            onChange={checkUserName}
                            value={loginCheck.userName} /><br /><br />

                        <input type="password"
                            placeholder="Password"
                            onChange={checkPassword}
                            value={loginCheck.password} /><br /><br />
                        <input className='btn btn-secondary' type="submit" value="Login" />
                    </form>
                </div> <br /><br />
                <div>
                    <FacebookLogin
                        appId='380146324150854'
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        cssClass="btn btn-primary"
                        icon="fa-facebook"
                    />
                    <div>
                        {showloginButton ?
                            <GoogleLogin
                                clientId="97679272577-f7tni719gg07os8fprjg1ecm4rq5ij85.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={onLoginSuccess}
                                onFailure={onLoginFailure}
                                callback={handleCallBackGoogle}
                                cookiePolicy={'single_host_origin'}
                                // inSignedIn={true}
                            /> : null
                        }

                        {showlogoutButton ?
                            <GoogleLogout
                                clientId="97679272577-f7tni719gg07os8fprjg1ecm4rq5ij85.apps.googleusercontent.com"
                                buttonText="Sign Out"
                                onLogoutSuccess={onSignoutSuccess}
                            >
                            </GoogleLogout> : null
                            }
                    </div>

                </div>
            </Modal>

            <Modal
                isOpen={signoutModal}
                style={customStyles}>
                <button className='btn btn-danger' style={{ float: 'center' }} onClick={() => { setsignoutModal(false); setisLoggedIn(false);signOut()}}>Sign out</button>
                <button className='btn btn-primary' style={{ float: 'right' }} onClick={() => setsignoutModal(false)}>X</button>
            </Modal>

            <Modal
                isOpen={isCreateAccountOpen}
                style={customStyles}
            >
                <div>
                    <h2>Create An Account
                        <button className='btn btn-danger' style={{ float: 'right' }} onClick={() => setCreateAccount(false)}>X</button>
                    </h2>
                </div>
                <div>
                    <form onSubmit={onSubmit}>
                        <input placeholder='Full Name'
                            type="text"
                            onChange={changeFullName}
                            value={userDetails.fullName} /> <br /><br />

                        <input placeholder='Username'
                            type="text"
                            onChange={changeUserName}
                            value={userDetails.userName} /> <br /><br />

                        <input placeholder='E-mail'
                            type="email"
                            onChange={changeEmail}
                            value={userDetails.email} /> <br /><br />

                        <input placeholder='Enter your password'
                            type="password"
                            onChange={changePassword}
                            value={userDetails.password} /> <br /><br />

                        <input placeholder='Confirm password'
                            type="password"
                            onChange={changeConfirmPassword}
                            value={userDetails.confirmPassword} /> <br /><br />

                        <input className='btn btn-primary' value="Create Account" type="submit" />
                    </form>
                </div>
            </Modal>
        </div>
    )
}
