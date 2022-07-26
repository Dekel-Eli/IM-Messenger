import { useState, useEffect } from "react";

const initialState = {
    recordingMinutes: 0,
    recordingSeconds: 0,
    initRecording: false,
    mediaStream: null,
    mediaRecorder: null,
    audio: null,
};



async function startRecording(setRecorderState) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        setRecorderState((prevState) => {
            return {
                ...prevState,
                initRecording: true,
                mediaStream: stream,
            };
        });
    } catch (err) {
        console.log(err);
    }
}

function saveRecording(recorder) {
    if (recorder.state !== "inactive") recorder.stop();
}


export default function useRecorder(handleInput) {
    const [recorderState, setRecorderState] = useState(initialState);

    useEffect(() => {
        const MAX_RECORDER_TIME = 5;
        let recordingInterval = null;

        if (recorderState.initRecording)
            recordingInterval = setInterval(() => {
                setRecorderState((prevState) => {
                    if (
                        prevState.recordingMinutes === MAX_RECORDER_TIME &&
                        prevState.recordingSeconds === 0
                    ) {
                        clearInterval(recordingInterval);
                        return prevState;
                    }

                    if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59)
                        return {
                            ...prevState,
                            recordingSeconds: prevState.recordingSeconds + 1,
                        };

                    if (prevState.recordingSeconds === 59)
                        return {
                            ...prevState,
                            recordingMinutes: prevState.recordingMinutes + 1,
                            recordingSeconds: 0,
                        };
                });
            }, 1000);
        else clearInterval(recordingInterval);

        return () => clearInterval(recordingInterval);
    });

    useEffect(() => {
        if (recorderState.mediaStream)
            setRecorderState((prevState) => {
                return {
                    ...prevState,
                    mediaRecorder: new MediaRecorder(prevState.mediaStream),
                };
            });
    }, [recorderState.mediaStream]);

    useEffect(() => {
        const recorder = recorderState?.mediaRecorder;
        let chunks = [];

        if (recorder && recorder.state === "inactive" && !recorder.mimeType) {
            recorder?.start();

            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };

            recorder.onstop = () => {
                const audioBlob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                chunks = [];
                let audioUrl = URL.createObjectURL(audioBlob);


                setRecorderState((prevState) => {
                    if (prevState.mediaRecorder)
                        return {
                            ...initialState,
                            audio: audioUrl,
                        };
                    else return initialState;
                });
                uploadAudio({ audioUrl: audioUrl });
            };
        }

        const uploadAudio = async (record) => {
            let audio = <audio controls>
                <source src={record.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio tag.
            </audio>;
            let type = "audio";
            handleInput(audio, type);
        }

        return () => {
            if (recorder) recorder.stream.getAudioTracks().forEach((track) => track.stop());
        };
    }, [handleInput, recorderState.mediaRecorder]);

    return {
        recorderState,
        startRecording: () => startRecording(setRecorderState),
        saveRecording: () => saveRecording(recorderState.mediaRecorder),
    };
}
