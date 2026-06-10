//Issues: The answer prompts won't work when asked questions like "Do you like music?"
// "What time is it for you?"
// There is also two chat boxes whcih I dont know how to make it to one chat box 
//I tried using AI wont fix it properly

import React, { useState, useEffect, useMemo, useRef } from 'react';

interface MessageType {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const RESPONSE_RULES: Record<string, string[]> = {
  "music": [
    "I love music! What's your favorite genre?",
    "Music is life! Do you have a favorite artist?",
    "Absolutely! Music can really set the mood. What do you like to listen to?"
  ],
  "time": [
    "I don't have a watch, but it's always chat time here!",
    "Time is just a concept for me, but I'm always here to chat!"
  ],
  "up to": [
    "Just chatting with you!",
    "Not much, just hanging out.",
    "Just here to talk!"
  ],
  "how are you": [
    "I'm doing great, thanks for asking!",
    "Pretty good! How about you?",
    "Not bad, just chilling.",
    "Nothing much, what about you?"
  ],
  "hello": ["Hey there! How's it going?", "Hello! Nice to hear from you.", "Hi! What's up?"],
  "hi": ["Hi! What are you up to?", "Hey!", "Hello there!"],
  "hey": ["Hey! What's new?", "Hi! How are you?"],
  "bye": ["Goodbye!", "See ya later!", "Bye! Have a great day!"],
  "thanks": ["You're very welcome!", "No problem at all!", "Anytime!"]
};

const DEFAULT_RESPONSES: string[] = [
  "That sounds interesting, tell me more!",
  "Oh wow, I didn't know that.",
  "That makes total sense.",
  "Can you clarify what you mean by that?",
  "Honestly, I completely agree with you.",
  "That's a unique perspective, I like it!",
  "I see where you're coming from, but I have a different take on it.",
  "That's a great point, I hadn't thought of it that way before.",
  "I can understand why you feel that way."
];

const SORTED_KEYWORDS = Object.keys(RESPONSE_RULES).sort((a, b) => b.length - a.length);

const Chatroom: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  const botName = useMemo(() => "Dejuan Hessel II", []);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const triggerBotReply = (userText: string) => {
    setIsTyping(true);
    const randomDelay = Math.floor(Math.random() * 600) + 600;

    setTimeout(() => {
      const lowerInput = userText.toLowerCase().trim();
      
      const sanitizedInput = lowerInput.replace(/[?!.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      let matchingPhrases: string[] | null = null;

      for (const keyword of SORTED_KEYWORDS) {
        const regex = new RegExp(`\\b${keyword.toLowerCase().trim()}\\b`, 'i');
        
        if (regex.test(sanitizedInput)) {
          matchingPhrases = RESPONSE_RULES[keyword];
          break; 
        }
      }

      if (!matchingPhrases && lowerInput.includes("?")) {
        matchingPhrases = [
          "That's a good question!",
          "Let me think about that.",
          "Interesting question — what do you think?"
        ];
      }

      const pool = matchingPhrases || DEFAULT_RESPONSES;
      const randomResponse = pool[Math.floor(Math.random() * pool.length)];

      setMessages(prev => [
        ...prev,
        { 
          id: Math.random().toString(36).substring(2, 9), 
          text: randomResponse, 
          sender: "bot" 
        }
      ]);

      setIsTyping(false);
    }, randomDelay);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = inputValue.trim();
    if (!textToSend) return;

    const newMessage: MessageType = {
      id: Math.random().toString(36).substring(2, 9),
      text: textToSend,
      sender: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    triggerBotReply(textToSend);
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '20px auto',
      border: '1px solid #ccc',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      height: '500px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        padding: '15px',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f5f5f5',
        fontWeight: 'bold'
      }}>
        Chatting with: {botName}
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isUser ? 'flex-end' : 'flex-start'
            }}>
              <span style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
                {isUser ? 'You' : botName}
              </span>
              <div style={{
                backgroundColor: isUser ? '#007bff' : '#e9ecef',
                color: isUser ? '#fff' : '#000',
                padding: '10px 14px',
                borderRadius: '12px',
                maxWidth: '75%',
                wordBreak: 'break-word'
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div style={{
            alignSelf: 'flex-start',
            color: '#888',
            fontSize: '14px',
            fontStyle: 'italic'
          }}>
            {botName} is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} style={{
        display: 'flex',
        borderTop: '1px solid #ccc',
        padding: '10px'
      }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginRight: '10px',
            fontSize: '16px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatroom;