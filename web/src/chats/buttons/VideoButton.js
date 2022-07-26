import { useRef } from "react";
import Modal from "../../shared/modal";
import '../Chats.css'

export function VideoButton(props) {

    const inputVid = useRef(null);
    const modalId = "videoModal";


    const uploadVid = (objSrc) => {
        let video = objSrc.obj
        let type = "video";
        props.handleInput(video, type);
    }

    const button = () => {
        return (
            <img type="button" className="send-btn clickable" src="sending_buttons/video.png" data-toggle="modal" data-target={`#${modalId}`} />
        )
    }


    return (
        <span>
            <Modal modalId={modalId}
                button={button()}
                title="Upload your video:"
                input={inputVid}
                upload={uploadVid}
                fileAccept="video/*">
            </Modal>
        </span>);
}