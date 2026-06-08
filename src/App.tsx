//import 

const Message = ({text}) => {

    return <>
     <p>
        {text}
     </p>
    </>;
}

const App = () => {
    //
    // buisnesss logic
    //

    const messages = [
        "Argentina",
        "Bolivia",
        "Cambodia",
    ];

    return <>
        <h1>
            Chatroom
        </h1>

        {
            messages.map(
                (text) => <Message text = {text} />
                )
        }

        <input />
        <button>
            send
        </button>
    </>;
}

export default App;