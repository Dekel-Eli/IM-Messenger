import React, { useRef } from "react";

import './SharedStyles.css';

export default function Modal(props) {
    const input = useRef(null);
    const upload = () => {
        let objSrc = {
            obj: URL.createObjectURL(input.current.files[0]),
            file: input.current.files[0]
        };
        input.current.value = "";
        props.upload(objSrc);
    }

    return (
        <div>
            {props.button}
            <div className="modal fade" id={props.modalId} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body card">
                            <input type="file"
                                ref={input}
                                accept={props.fileAccept}
                                id="myFile"
                                name="filename" />
                        </div>
                        <div className="modal-footer">
                            <input type='button'
                                data-dismiss="modal"
                                onClick={upload}
                                value='Upload'
                                id='btn_upload'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}