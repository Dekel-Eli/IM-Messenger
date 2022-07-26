import React, { useState, useEffect } from "react";
import UserInfo from "../shared/UserInfo";
import "./Chats.css";
import { ChatWindow } from "./ChatWindow";
import { Navigate } from 'react-router-dom';
import { getChat, addChat, getChatByParticipants, getActiveContactsByChats } from "../shared/ChatsService";
import { ContactsPanel } from "./ContactsPanel";
import { addChatToProfile } from "../shared/ProfileService";
import { getProfile } from "../shared/ProfileService";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import About from "../shared/About";


const Chats = (props) => {

    // holds the current chat id
    const [currentChat, setCurrentChat] = useState(0);
    // holds the actual chat that should be rendered
    const [chatData, setChatData] = useState(getChat(currentChat));
    // const [chatsList, setChatsList] = useState(undefined);
    // a flag for indicating a change in the chat id - activating useEffect
    const [state, setState] = useState({ isChatChanged: false, initState: true });
    const [showAbout, setShowAbout] = useState(false);

    const getMyProfile = () => {
        let user = UserInfo({ "action": "get" });
        return (user);
    }

    /* changes chat id, and turning on a flag 
       that execute the useEffect below     */
    const updateChat = (chatId) => {
        setCurrentChat(chatId);
        setChatData(getChat(chatId));
        setState({ isChatChanged: true, initState: false });

    }
    // use effect updates the actual chat hook
    useEffect(() => {
        if (state.isChatChanged) {
            setChatData(getChat(currentChat));
            let newChat = chatData.messages.length > 0 ? false : true;
            setState({ isChatNew: newChat, isChatChanged: false });
        }
    }, [chatData.messages.length, currentChat, state, state.isChatChanged]);

    const newChat = (participant) => {
        let newChat;
        if (!getActiveContactsByChats(getMyProfile().id, getMyProfile().chatsIds)
            .includes(participant.id)) {
            let participants = [participant.id, getMyProfile().id];
            newChat = addChat(participants, []);
            addChatToProfile(participants, newChat.chatId);
            setCurrentChat(newChat.chatId);
            setChatData(getChat(newChat.chatId));
            setState({ isChatChanged: true, isChatNew: true, initState: false });
        } else {
            newChat = getChatByParticipants(getMyProfile().id, participant.id);
            updateChat(newChat.chatId);
        }
    }

    const talkToProfile = (talkTo) => {
        return getProfile(talkTo);
    }

    const about = () => {
        setShowAbout(!showAbout)
    }

    return (
        <div className="grid">
            {!getMyProfile() ? <Navigate to="/" replace /> :
                (
                    <div className="grid-container back" >
                        <span className='col fooHeader my-4' >
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                    <Tooltip styleName="tooltip">
                                        About
                                    </Tooltip>}
                            >
                                <img className="img-logo" src="foo-chats-menu.png" alt="logo" onClick={about} />
                            </OverlayTrigger>
                        </span>
                        {(!showAbout) ? (<></>) :
                            <div className=" menu dropdown-menu d-block p-3 my-4">
                                <About />
                            </div>
                        }

                        <Col className="fooPanel col-12">
                            <ContactsPanel
                                setCurrent={updateChat}
                                user={getMyProfile()}
                                startNewChat={newChat}
                                activeChat={currentChat} />
                        </Col>
                        <Col className="fooChat right">
                            <ChatWindow
                                currentChat={chatData}
                                updateCurrent={updateChat}
                                userId={getMyProfile().id}
                                state={state}
                                talkToProfile={talkToProfile}
                            />
                        </Col>
                    </div>
                )
            }
        </div>
    );
}
export default Chats;




