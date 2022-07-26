import React from "react";
import './Chats.css';

// upper left panel
export function ProfileBar(props) {

    return (
        <div className="contact-info">
            <img src={props.profile.photo} className="avatar" />&nbsp;
            <span className="contact-name profile">{props.profile.nickname} </span>
        </div>
    );
}