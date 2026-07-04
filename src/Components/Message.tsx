interface MessageProps {
    text: string;
    name: string;
    timestamp: string;
}

const Message: React.FC<MessageProps> = 
({
    text,
    name,
    timestamp,
}) => {
    return (
        <div className = "message">
            <strong>
                {name}
            </strong>
            <p>
                {text}
            </p>
            <span>
                {timestamp}
            </span>
        </div>
    );
};

export default Message;
