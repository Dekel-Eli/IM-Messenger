

import "./record.css";
function formatMinutes(minutes) {
    return minutes < 10 ? `0${minutes}` : minutes;
}

function formatSeconds(seconds) {
    return seconds < 10 ? `0${seconds}` : seconds;
}


export default function RecorderControls({ recorderState, handlers }) {
    const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
    const { startRecording, saveRecording } = handlers;

    return (
        <div className="controls-container">
            {initRecording ? (
                <div className="recorder-display">
                    <div className="recording-time">
                        {initRecording && <div className="recording-indicator"></div>}
                        <span>{formatMinutes(recordingMinutes)}</span>
                        <span>:</span>
                        <span>{formatSeconds(recordingSeconds)}</span>
                    </div>
                </div>) : <></>}
            <div className="start-button-container">
                {initRecording ? (
                    <button
                        className="start-button"
                        title="Save recording"
                        disabled={recordingSeconds === 0}
                        onClick={saveRecording}
                    />
                ) : (
                    <img id="recordButton"
                        className="send-btn clickable"
                        src="sending_buttons/mic.png"
                        onClick={startRecording}
                        alt="mic" />
                )}
            </div>
        </div>
    );
}
