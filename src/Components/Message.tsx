import React, { useState, useEffect, useMemo, useRef } from 'react';
import '../App.css';

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
    <div className="chat-container">
      <div className="chat-header">
        Chatting with: {botName}
      </div>

      <div className="chat-messages-area">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div 
              key={msg.id} 
              className={`message-wrapper ${isUser ? 'user' : 'bot'}`}
            >
              <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
                <strong>{isUser ? 'You' : botName}:</strong> {msg.text}
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="chat-typing-indicator">
            {botName} is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="chat-submit-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatroom;