import React, { useState } from "react";
import { useRef } from "react";

/*
    props: handleInput: generates a new message and adds to the array
    
    InputBar is resposible for clearing the text box when sent and sending
    its content to handleInput
*/
export function InputBar(props) {
    const [inputDir, setInputDir] = useState("rtl");
    const inputText = useRef(null);

    const onButtonClick = () => {
        let messageContent = inputText.current.value;
        let type = inputText.current.type;
        if (messageContent === "") {
            return;
        }
        inputText.current.value = "";
        props.handleInput(messageContent, type);
    }

    const onEnter = (e) => {
        if (e.key === "Enter") {
            onButtonClick();
        }
    }

    return (
        <span className="d-flex">
            <input className={(inputDir == "rtl" ? "rtl" : "ltr") + " border rounded w-100 "}
                type="text" size={64} ref={inputText} onKeyDown={onEnter}
                placeholder="✍️(◔◡◔)"
                onContextMenu={(e) => {
                    e.preventDefault();
                    setInputDir(inputDir === "rtl" ? "ltr" : "rtl");
                }}
            />
            <img className="send-btn clickable "
                onClick={onButtonClick}
                src="sending_buttons/send.jpg"
                alt="send" />
        </span>
    );
}