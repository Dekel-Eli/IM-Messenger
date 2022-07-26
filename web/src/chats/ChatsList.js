import React, { useState, useRef } from "react";
import UserInfo from "../shared/UserInfo";
import '../shared/SharedStyles.css';
import './Chats.css';
import { getRecieverInfo, orderChatsByLastUpdate } from "../shared/ChatsService";


function ContactInfo(props) {
    let info = getRecieverInfo(props.chatId, props.userId);
    let lastMessageContent;
    if (info.lastMessage) {
        if (info.lastMessage.type === "text") {
            lastMessageContent = info.lastMessage.data;
        }
        else if (info.lastMessage.type === "image") {
            lastMessageContent = "📷";
        }
        else if (info.lastMessage.type === "video") {
            lastMessageContent = "📹";
        }
        else if (info.lastMessage.type === "audio") {
            lastMessageContent = "🎵";
        }
        else if (info.lastMessage.type === "file") {
            lastMessageContent = "📂";
        }
    }

    return (
        <div className={props.chatId === props.activeChat ?
            "alert-primary" : null}>
            <div className="border-bottom contact-info pb-2">
                <img src={info.photo} className="avatar" />
                <div className="px-3">
                    <span className="contact-name">{info.name} </span>
                    <span className="last-msg">
                        <div className="last-content p-0">{lastMessageContent}</div>
                        <div className="last-time">{info.lastUpdateDate}</div>
                    </span>
                </div>
            </div>
        </div>
    );
}

/*
    bottom left panel

    props: setCurrent: changes the current chat id and chat data
           user: the current active user 
*/
export function ChatsList(props) {
    const renderChats = () => {
        // chats has chat Id's
        let chats = orderChatsByLastUpdate(UserInfo({ "action": "get" }).chatsIds);


        // on click updates the hook, causes a rerender
        return (
            <div>
                {chats.map((chat) => (
                    <div key={chat}>
                        <div
                            className="clickable chat-list"
                            onClick={() => { props.setCurrent(chat); }}
                        >
                            <ContactInfo
                                chatId={chat}
                                userId={props.user}
                                activeChat={props.activeChat} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="border-0 card chats-list h6">
            {renderChats()}
        </div>

    );

}