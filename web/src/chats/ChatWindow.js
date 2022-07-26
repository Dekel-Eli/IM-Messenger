import { addMessageToChat } from "../shared/ChatsService";
import { getCurrentDate } from "../shared/Utils";
import { FileButton } from "./buttons/FileButton";
import { ImageButton } from "./buttons/ImageButton";
import { InputBar } from "./buttons/InputBar";
import { RenderMessagePanel } from "./Messages";
import Recorder from "./record/Recorder.js";
import { VideoButton } from "./buttons/VideoButton";


/*
    props: currentChat: the chat that is rendered
           updateCurrent: changes the current chat id and chat data
           userId: the user's id
*/
export function ChatWindow(props) {
    let chatId = props.currentChat.chatId;
    let talkTo = props.currentChat.participants.filter(p => p !== props.userId)[0];
    let talkToProfile = props.talkToProfile(talkTo);

    const handleInput = (messageContent, type) => {
        let message = {
            messageId: props.currentChat.messages.length + 1,
            senderId: props.userId,
            receiverId: props.currentChat.participants
                .filter(participant => participant !== props.userId)[0],
            date: getCurrentDate(),
            content: {
                type: type,
                data: messageContent
            },
        }
        // updates the messages array with the new message
        addMessageToChat(chatId, message);
        // changes the hook, causes a rerender
        props.updateCurrent(chatId);
    }



    return (
        <div >
            {props.state?.initState ? (<div className=""
                id="style-1"
                style={{
                    height: "90vh", backgroundImage: `url("backgrounds/foohi.gif")`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: "center",
                }}>
            </div>) :
                (
                    <div >
                        <div className="talk-to-panel p-2">
                            <img
                                src={talkToProfile.photo}
                                className="avatar"
                                alt={talkToProfile.nickname} />&nbsp;
                            <span className="profile">{talkToProfile.nickname} </span>
                        </div>
                        <RenderMessagePanel messages={props.currentChat.messages} userId={props.userId} />
                        <div className=" flex-row-reverse fooFooter p-3 d-flex">
                            <InputBar handleInput={handleInput} />
                            <ImageButton handleInput={handleInput} />
                            <VideoButton handleInput={handleInput} />
                            <FileButton handleInput={handleInput} />
                            <Recorder handleInput={handleInput} />
                        </div>
                    </div>
                )}
        </div>
    );
}