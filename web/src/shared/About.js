export default function About() {
    const txtLine = {
        backgroundColor: 'antiquewhite',
    };

    return (
        <>
            <h1 className="alert-info badge-pill text-center"> Welcome To Foo`tsApp!</h1>
            <h6>⚙️by Michael Saar, Dekel Eli & Bareket Damari</h6>
            <h6>⚙️Version: 1.0.0 ©MDB</h6>
            <br></br>
            <h5 style={txtLine}> ✨ You can send messages to anyone who is using foo'tsApp,
                including simple txt, images, videos and files</h5>
            <h5 style={txtLine}> ✨ You can even record a message if you want: just press🎙️ </h5>
            <br></br>
            <h4> Some cool features we think you'll love:</h4>
            <h5 style={txtLine}> ✨ You can change input direction by mouse right click</h5>
            <h5 style={txtLine}> ✨ You can change the chat theme by clicking on the ⚙️ button right above the chat window
                till you find the one you</h5>
            <h5 style={txtLine}> ❗ Double click on the chat window will restore default background </h5>
            <br></br>
            <br></br>
            <h4 className="text-center"> Enjoy!</h4>
            <h6 className="alert-danger text-center">to close this window press the icon at the top-left </h6>

        </>
    )

}