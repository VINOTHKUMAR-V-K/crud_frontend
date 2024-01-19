import React, { useEffect, useState } from 'react'
import '../styles/filter.css';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';

// import axios from 'axios';
import axiosClient from '../axiosClient';
import { jwtDecode } from 'jwt-decode';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0,0,0,0.75)',
        textAlign: 'center'
    }
};


const Header = () => {
    const location = useLocation();

    const [background, setBackground] = useState('red');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalAnOpen, setModalAnOpen] = useState(false);
    const [login, setLogin] = useState(false)
    const [username, setUsername] = useState("")
    const [pic, setPic] = useState("");
    const [logUser, setLogUser] = useState([]);
    const [signUser, setSignUser] = useState([])
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")
    useEffect(() => {
        if (location.pathname === '/') {
            setBackground('rgba(0,0,0,0.50)');
        } else {
            setBackground('red')
        }
    }, [location.pathname])

    const Modalopen = () => {
        setModalIsOpen(true)
    }
    const ModalAnopen = () => {
        setModalAnOpen(true)
    }

    const ModalClose = () => {
        setModalIsOpen(false)
    }
    const ModalAnClose = () => {
        setModalAnOpen(false)
    }

    const responseFacebook = (response) => {
        console.log(response);
    }


    const isLoggedout = () => {
        googleLogout();
        setLogin(false);
        sessionStorage.clear()
    }

    const responseGoogle = (response) => {
        setLogin(true);
        var decode = jwtDecode(response.credential)
        setUsername(decode.given_name)
        setPic(decode.picture)
        console.log(decode)
    };

    const loggedInApi = (e) => {
        e.preventDefault();
        const data = {
            email: mail,
            password: pass
        }
        axiosClient.post(`/zomoto/loginUser`, data)
            .then((res) => {
                setLogin(true)
                sessionStorage.setItem("user",res.data.user.username);
                setLogUser(res.data.user);
                console.log(logUser, 'login success');
                var answer = sessionStorage.getItem("user")
                setUsername(answer)
                console.log(username)
               
            })
            .catch(err => err, 'loginfailed')
       
        ModalClose()
    }

    const signinApi = () => {
        const data = {
            username: name,
            email: mail,
            password: pass
        }
        axiosClient.post(`/zomoto/postUser`, data)
            .then(res => setSignUser(res.data),
                console.log(signUser, 'signin success'),
            )
            .catch(err => err, 'signinfailed')
        ModalAnClose();
    }
    const targetName = (e) => {
        setName(e.target.value)
    }
    const targetMail = (e) => {
        setMail(e.target.value)
    }
    const targetPass = (e) => {
        setPass(e.target.value)
    }

    return (
        <div>
            {!login ? (<div class="container-fluid head" style={{ backgroundColor: background }}>
                <div class="box">VK</div>

                <button class="btn btn-outline-danger text-white" onClick={Modalopen}>login</button>
                <button class="btn btn-outline-danger text-white mx-2" onClick={ModalAnopen}>Create an Account</button>
            </div>) :
                (<div class="container-fluid head" style={{ backgroundColor: background }}>
                    <div class="box">VK</div>
                    <img src={pic} alt="my img" height={"50px"} width={"50px"} style={{borderRadius:"50%",marginTop:"18px"}}/>
                    <button class="btn btn-outline-danger text-white">{username}</button>
                    <button class="btn btn-outline-danger text-white mx-2" onClick={isLoggedout}>logout</button>
                </div>)
            }

            <Modal id='login' isOpen={modalIsOpen} style={customStyles}>
                <h1 style={{ margin: 'auto', textAlign: 'center', color: 'orange' }}>Login</h1>

                <label><h3 style={{ color: 'orange' }}>Email:</h3></label>
                <br />
                <input type="email" value={mail} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' onChange={targetMail} placeholder='Enter a valid Email' />
                <br />
                <label><h3 style={{ color: 'orange' }}>Password:</h3></label>
                <br />
                <input type="password" value={pass} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' onChange={targetPass} placeholder='Enter Password' />
                <br />
                <button className='btn' style={{ backgroundColor: 'gray', color: 'white' }} value={username} onClick={loggedInApi} >login</button>
                <br />
                <FacebookLogin
                    appId="982365532862279"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    icon="fa-facebook"
                    autoLoad={false}
                />

                <br />
                <br />
                <div style={{ textAlign: 'center' }} className='px-5'>
                    <GoogleOAuthProvider clientId="569992073426-asp1kbf37h9kca8mqnite1unvva1g3qo.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={responseGoogle}
                        />
                    </GoogleOAuthProvider>
                </div>

                <br />
                <br />
                <div className='btn' style={{ backgroundColor: 'gray', color: 'white' }} onClick={ModalClose}>close</div>
            </Modal>
            <Modal isOpen={modalAnOpen} style={customStyles}>
                <form onSubmit={signinApi}>
                    <h1 style={{ color: 'orange' }}>Registeration Form</h1>
                    <br />
                    <label><h3 style={{ color: 'orange' }}>Username :</h3></label>
                    <br />
                    <input type="text" onChange={targetName} value={name} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' placeholder='Enter a name' />
                    <br />
                    <label><h3 style={{ color: 'orange' }}>Email:</h3></label>
                    <br />
                    <input type="email" onChange={targetMail} value={mail} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' placeholder='Enter a valid Email' />
                    <br />
                    <label><h3 style={{ color: 'orange' }}>Password:</h3></label>
                    <br />
                    <input type="password" onChange={targetPass} value={pass} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' placeholder='Enter Password' />
                    <br />
                    <a href=" " >Do you have any account.</a>
                    <br /><br />
                    <input type="button" className='border border-3 rounded-3' onClick={signinApi} value="submit" />
                </form>
            </Modal>


        </div>
    )
}

export default Header