import {useState} from 'react';
import Message from './Components/Message';
import './App.css';

const App = () => {
    //
    // buisnesss logic
    //

    /*
   const messages = [
        "Argentina",
        "Bolivia",
        "Cambodia",
    ];
    */

    const [messages, setMessages] = useState<string[]>([]);

    return <>
    <h1>
        Chatroom
    </h1>

    {
        messages.map(
            (text, index) => <Message key = {index} text = {text} />
        )
    }

    <form onSubmit = {(event) => {
        event.preventDefault();
        const new_message = event.target.incoming_text.value;
        setMessages([...messages, new_message]);

        document.getElementById('incoming_text')!.value = '';
    }}>

        <input name = 'incoming_text' id = 'incoming_text' />
        <button type = 'submit'>
            send
        </button>
        </form>

    </>;
    }

export default App;