import { useRef } from "react";
import Modal from "../../shared/modal";
import '../Chats.css'

export function ImageButton(props) {

    const inputImg = useRef(null);
    const modalId = "imageModal";

    const uploadImg = (objSrc) => {
        let image =objSrc.obj;
        //let type = inputImg.current.type;
        /* consider using the following line instead (for images only) */
        let type = "image";
        props.handleInput(image, type);
    }
    const imgaButton = () => {
        return (
            <img type="button" className="send-btn clickable" src="sending_buttons/camera.png" data-toggle="modal" data-target={`#${modalId}`} />
        )
    }

    return (
        <span>
            <Modal modalId={modalId}
                button={imgaButton()}
                title="Upload your photo:"
                input={inputImg}
                upload={uploadImg}
                fileAccept="image/*">
            </Modal>
        </span>);
}