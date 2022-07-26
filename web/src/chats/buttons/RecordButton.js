import React from "react";
import './Chats.css'


const audioType = "audio/mpeg"

export default class RecordButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
        };
    }

    async componentDidMount() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // init recording
        this.mediaRecorder = new MediaRecorder(stream);
        // init data storage for video chunks
        this.chunks = [];
        // listen for data from media recorder
        this.mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) {
                this.chunks.push(e.data);
            }
        };
    }

    startRecording(e) {
        e.preventDefault();
        // wipe old data chunks
        this.chunks = [];
        // start recorder with 10ms buffer
        this.mediaRecorder.start(10);
        // say that we're recording
        this.setState({ recording: true });
    }

    stopRecording(e) {
        e.preventDefault();
        // stop the recorder
        this.mediaRecorder.stop();
        // say that we're not recording
        this.setState({ recording: false });
        // save the video to memory
        this.saveAudio();
    }

    saveAudio() {
        let audioBlob = new Blob(this.chunks, { 'type': 'audio/mpeg' });
        this.chunks = [];
        let audioUrl = URL.createObjectURL(audioBlob);
        let record = {
            audioUrl: audioUrl,
        };
        this.uploadAudio(record);
    }

    uploadAudio(record) {
        let audio = record.audioUrl;
        let type = "audio";
        this.props.handleInput(audio, type);
    }

    render() {
        const { recording, videos } = this.state;

        return (
            <span>
                {!recording && <img className="send-btn clickable" src="mic.png" onClick={e => this.startRecording(e)} />}
                {recording && <img className="send-btn clickable" src="mic.png" onClick={e => this.stopRecording(e)} />}
            </span>
        );
    }
}

