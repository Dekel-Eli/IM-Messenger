import React, { useRef, useState } from "react";
import { Navigate } from 'react-router-dom';
import { profileService, isProfileEnrolled, EnrollProfile } from '../shared/ProfileService';
import UserInfo from '../shared/UserInfo';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { errorGenerator } from "./ErrorGenrator";


const PopupInvalidRegister = (props) => {
    return (
        <>
            <Modal.Dialog className="alert-danger bg-transparent modal-backdrop modal-dialogs">
                <Modal.Header closeButton>
                    <Modal.Title>{errorGenerator()}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{props.modalMessage}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </>
    );
}


const RegisterForm = (props) => {

    const password = useRef(null);
    const confirmPassword = useRef(null);
    const username = useRef(null);
    const nickname = useRef(null);
    const image = useRef(null);

    const isPasswordValid = (password) => {
        return (password.match("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})") != null);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        // check that fields are not empty
        if (username.current.value === '' || password.current.value === '' || nickname.current.value === '' || confirmPassword.current.value === '') {
            //TODO: modal error 
            props.setModalMessage("Please fill all fields");
            props.setShow(true);
            return;
        }
        // check that password is valid 
        if (!isPasswordValid(password.current.value)) {
            //TODO: modal error 
            props.setModalMessage("Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            props.setShow(true);
            return;
        }
        if (password.current.value !== confirmPassword.current.value) {
            props.setModalMessage("Passwords do not match");
            props.setShow(true);
            return;
        }
        let photo = null;
        if (image.current.value !== '') {
            photo = URL.createObjectURL(image.current.files[0]);
        } else {
            photo = 'shrek_smith_prof_pic.jpg';
        }
        const newProfile = profileService({
            "func": EnrollProfile,
            "profile": {
                username: username.current.value,
                password: password.current.value,
                nickname: nickname.current.value,
                photo: photo
            }
        });
        if (newProfile === null) {
            //TODO: modal error 
            props.setModalMessage("Username or nickname already exists");
            props.setShow(true);
            return;
        }
        // the input is valid, set the chat state and redirect to the chat page
        UserInfo({ "action": "set", "profile": newProfile });
        props.setRedirect(true);

    }




    return (
        <div>
            <div className='logo alert m-3'>
                <h1 className="display-4 welcome">Join us at FootsApp!</h1>
                <img src="FOO.gif" alt="logo" className="rounded-circle row sticky-top col-5 p-0 float-sm-right float-lg-left" />
            </div>
            <form className='form-format alert-dark' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>
                        Username
                    </label>
                    <div>
                        <input name="username" type="text" className='form-control' placeholder="fooBob" ref={username} />
                    </div>

                </div>
                <div className='form-group'>
                    <label>
                        Nickname
                    </label>
                    <div>
                        <input name="nickname" type="text" className='form-control' placeholder="Bob Foo" ref={nickname} />
                    </div>

                </div>
                <div className='form-group'>
                    <label>
                        Password
                    </label>
                    <div>
                        <input name="password" type="password" className='form-control' placeholder="f0otsaPP1sawwweom!" ref={password} />
                    </div>
                </div>
                <div className='form-group'>
                    <label>
                        Confirm password
                    </label>
                    <div>
                        <input name="Confirm password" type="password" className='form-control' placeholder="" ref={confirmPassword} />
                    </div>
                </div>
                <div className='form-group '>
                    <label>
                        Image
                    </label>
                    <div>
                        <input type="file" ref={image} accept="image/*" id="myFile" name="filename" className="form-control" /><br />
                    </div>
                </div>
                <input type="submit" value="Submit" className='btn btn-success' />
                <div>
                    already signed up? <Link to="/login">click here!</Link>
                </div>
            </form>
        </div>
    );
}

const Register = (props) => {
    const [redirect, setRedirect] = useState(false);
    // set the initial state of the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [modalMessage, setModalMessage] = useState(null);
    return (
        <div>
            {redirect ? <Navigate to="/chats" replace /> : <RegisterForm setShow={setShow} setRedirect={setRedirect} setModalMessage={setModalMessage} />}
            {show ? <PopupInvalidRegister show={show} setShow={setShow} onClose={handleClose} modalMessage={modalMessage} /> : null}
        </div>
    );
}

export default Register;