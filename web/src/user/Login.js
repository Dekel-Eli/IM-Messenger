import React, { useRef } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { profileService, isProfileEnrolled } from '../shared/ProfileService';
import UserInfo from '../shared/UserInfo';
import './LogReg.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { errorGenerator } from './ErrorGenrator';


const PopupInvalidLogin = (props) => {

    return (
        <>
            <Modal.Dialog className='alert-danger bg-transparent modal-backdrop modal-dialogs'>
                <Modal.Header>
                    <Modal.Title>{errorGenerator()}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Invalid username or password</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </>
    );
}


const LoginForm = (props) => {

    const username = useRef(null);
    const password = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const prof = profileService({
            "func": isProfileEnrolled,
            "profile": {
                username: username.current.value,
                password: password.current.value
            }
        });
        var isLoginValid = (prof && prof.length) ? true : false;
        if (!isLoginValid) {
            //TODO: modal error 
            //alert("Invalid username or password");
            props.setShow(true);
        } else {
            props.setRedirect(isLoginValid);
            UserInfo({ "action": "set", "profile": prof[0] });
        }
    }

    return (
        <div>
            <div className='logo alert m-3'>
                <h1 className="display-4 welcome">Welcome to Foo`tsApp!</h1>
                <img src="FOO.gif" alt="logo" className="rounded-circle row sticky-top col-5 p-0 float-sm-right float-lg-left" />
            </div>
            <form className='form-format jumbotron alert-dark ' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Username</label>
                    <div>
                        <input name="username" type="text" className='form-control' ref={username} placeholder='your username' required />
                    </div>
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <div>
                        <input name="password" type="password" className='form-control' ref={password} placeholder='your pssword' required />
                    </div>
                </div>

                <button type="submit" className='btn btn-success' value="Submit">Login</button>
                <div>
                    not registered? <Link to="/register">click here!</Link>
                </div>
            </form>

        </div>
    );

}

const Login = (props) => {
    const [redirect, setRedirect] = useState(false);
    // set the state of the modal   
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    return (
        <div>
            {redirect ? <Navigate to="/chats" replace /> : <LoginForm setShow={setShow} setRedirect={setRedirect} />}
            {show ? <PopupInvalidLogin show={show} setShow={setShow} onClose={handleClose} /> : null}
        </div>
    );

}

export default Login;