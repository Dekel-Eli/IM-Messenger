import RecorderButtons from "./RecorderButtons";
import useRecorder from "./useRecorder";

export default function Recorder(props) {
    const { recorderState, ...handlers } = useRecorder(props.handleInput);

    return (
        <>
            <RecorderButtons recorderState={recorderState} handlers={handlers} />
        </>
    );
}