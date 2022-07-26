import React from "react";
import { formatTimeFromDate } from "../shared/Utils";
import Image from "react-bootstrap/Image";
import { Tooltip, OverlayTrigger, Popover } from "react-bootstrap";

const ImageContent = (props) => {
    return (
        <Image src={props.messagae.content.data} fluid className="img-msg" />
    );
}

const AudioContent = (props) => {
    return (
        props.message.content.data
    );
}

const VideoContent = (props) => {
    return (
        <video width="320" height="240" controls>
            <source className="media-msg" src={props.message.content.data} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}

const FileContent = (props) => {
    return (
        <span>
            <a href={props.message.content.data.url} download={props.message.content.data.name}>{props.message.content.data.name}</a>
            📎
        </span>
    );
}



const SenderMessage = (props) => {
    return (
        <div className="msg-send">
            <div className="msg-content-send">
                {
                    (() => {
                        if (props.message.content.type === "text") {
                            return (
                                <div>{props.message.content.data}</div>
                            );
                        }
                        else if (props.message.content.type === "image") {
                            return (
                                <ImageContent messagae={props.message} />
                            );
                        }
                        else if (props.message.content.type === "video") {
                            return (
                                <VideoContent message={props.message} />
                            );
                        }
                        else if (props.message.content.type === "audio") {
                            return (
                                <AudioContent message={props.message} />
                            );
                        }
                        else if (props.message.content.type === "file") {
                            return (
                                <FileContent message={props.message} />
                            );
                        }
                    })()
                }
                <span className="sender-time">{props.message.dateFormat}</span>
            </div>
        </div>
    );
}

const ReceiverMessage = (props) => {
    return (
        <div className="msg-reciv">
            <div className="msg-content-reciv">
                {
                    (() => {
                        if (props.message.content.type === "text") {
                            return (
                                <div>{props.message.content.data}</div>
                            );
                        }
                        else if (props.message.content.type === "image") {
                            return (
                                <ImageContent messagae={props.message} />
                            );
                        }
                        else if (props.message.content.type === "video") {
                            return (
                                <VideoContent message={props.message} />
                            );
                        }
                        else if (props.message.content.type === "audio") {
                            return (
                                <AudioContent message={props.message} />
                            );
                        }
                        else if (props.message.content.type === "file") {
                            return (
                                <FileContent message={props.message} />
                            );
                        }
                    })()
                }
                <span className="sender-time">{props.message.dateFormat}</span>
            </div>
        </div>
    );
}


// its only purpose is to render the messages from the active chat
export function RenderMessagePanel(props) {
    const [background, setBackground] = React.useState(1);
    let messages = [...props.messages].reverse().map((message, key) => {
        return Object.assign(message, { dateFormat: formatTimeFromDate(message.date) });
    });

    const updateBg = () => {
        setBackground(background == 11 ? 0 : background + 1);
    }
    const defaultBg = () => {
        setBackground(0)
    }

    return (
        <div style={background ? { height: "69vh", backgroundImage: `url("backgrounds/${background}.png` }
            : { height: "69vh" }}
            id="style-1" className="chat-window py-1" onDoubleClick={defaultBg}
        >
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                    <Tooltip styleName="tooltip">
                        change chat background
                    </Tooltip>}
            >
                <button className="btn my-4 sticky-top bg-button bg-transparent"
                    variant="secondary"
                    onClick={updateBg}>⚙️</button>
            </OverlayTrigger>
            {
                messages?.map((message) => (
                    <div key={message.messageId} >
                        {(message.senderId === props.userId)
                            ? <SenderMessage message={message} />
                            : <ReceiverMessage message={message} />
                        }
                    </div>
                ))
            }
        </div>
    );
}
