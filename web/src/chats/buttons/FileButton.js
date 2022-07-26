import { useRef } from "react";
import Modal from "../../shared/modal";
import '../Chats.css'

export function FileButton(props) {

    const inputFile = useRef(null);
    const modalId = "fileModal";

    const uploadImg = (objSrc) => {
        let file = {
            "url": objSrc.obj,
            "name": objSrc.file.name,
        }
        let type = "file";
        props.handleInput(file, type);
        inputFile.current.value = "";
    }


    const button = () => {
        return (
            <img type="button" className="send-btn clickable" src="sending_buttons/file.png" data-toggle="modal" data-target={`#${modalId}`} />
        )
    }

    return (
        <span>
            <Modal modalId={modalId}
                button={button()}
                title="Upload your file:"
                input={inputFile}
                upload={uploadImg}
                fileAccept="file/*"
            ></Modal>
        </span>);
}