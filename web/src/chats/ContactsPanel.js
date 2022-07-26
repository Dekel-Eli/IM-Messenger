import React from "react";
import AutoCompleteInput from "../shared/AutocompleteInput";
import { getContacts } from "../shared/ProfileService";
import { ChatsList } from "./ChatsList";
import { ProfileBar } from "./ProfileBar";
import "./Chats.css";

// left panel
export function ContactsPanel(props) {
    let contacts = getContacts(props.user.id);

    const setAction = (value) => {
        props.startNewChat(value);
    }

    return (
        <div className="d-block p-1">
            <ProfileBar profile={props.user} />
            <AutoCompleteInput
                placeholder={"Start a new chat with...👽 "}
                setActionOnButton={setAction}
                data={contacts}
                filterBy={"nickname"}
            />
            {/* <AddChat /> */}
            <ChatsList setCurrent={props.setCurrent}
                user={props.user.id}
                chats={props.chats}
                updateList={props.updateList}
                activeChat={props.activeChat} />
        </div>

    );

}