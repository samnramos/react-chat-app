## Practice Chat App

A simple chat app built with plain React (Vite + TypeScript) — no Ionic, no form library. It handles form input the vanilla way (preventDefault and reading the value straight from the DOM), which is the "before" example we later improve on.

Stack: React + Vite, with @faker-js/faker for fake usernames
See src/App.tsx for the input handling referenced in the June 30 deck
Compare with ../ionic-chat-app, the Ionic version of the same idea

## Run
yarn install

yarn dev

## How to use 

1. Input a message you want to start the conversation with
2. depending on your input is, it should give you one of these responses

## Responses

"music": 
    "I love music! What's your favorite genre?",
    "Music is life! Do you have a favorite artist?",
    "Absolutely! Music can really set the mood. What do you like to listen to?"

"up to": 
    "Just chatting with you!",
    "Not much, just hanging out.",
    "Just here to talk!"
  
"how are you": 
    "I'm doing great, thanks for asking!",
    "Pretty good! How about you?",
    "Not bad, just chilling.",
    "Nothing much, what about you?"
    
"hello": ["Hey there! How's it going?", "Hello! Nice to hear from you.", "Hi! What's up?"],

"hi": ["Hi! What are you up to?", "Hey!", "Hello there!"],

"hey": ["Hey! What's new?", "Hi! How are you?"],

"bye": ["Goodbye!", "See ya later!", "Bye! Have a great day!"],

"thanks": ["You're very welcome!", "No problem at all!", "Anytime!"]

Other questions:

"That sounds interesting, tell me more!",

"Oh wow, I didn't know that.",

"That makes total sense.",

"Can you clarify what you mean by that?",

"Honestly, I completely agree with you.",

"That's a unique perspective, I like it!",

"I see where you're coming from, but I have a different take on it.",

"That's a great point, I hadn't thought of it that way before.",

"I can understand why you feel that way."
