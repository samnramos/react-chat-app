import React, { useState } from 'react';
import Message from './components/Message';
import './App.css';

interface MessageDataType {
  text: string;
  name: string;
  timestamp: string;
}

const App = () => {
    const [messages, setMessages] = useState<MessageDataType[]>([]);
    const [inputText, setInputText] = useState<string>('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim() === '') return;

        const newMessage: MessageDataType = {
            text: inputText,
            name: 'You', 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputText(''); 
    };

    return (
        <div className="chatroom-container">
            <h1>Chatroom</h1>

            <div className="messages-feed">
                {messages.map(({ text, name, timestamp }, index) => (
                    <Message
                        key={index}
                        text={text}
                        name={name}
                        timestamp={timestamp}
                    />
                ))}
            </div>

            <form onSubmit={handleSendMessage} className="message-form">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div> 
    );
};

export default App;