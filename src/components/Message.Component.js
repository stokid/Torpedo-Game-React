import './Message.Component.css';

const Message = ({ messages }) => {

    return (
        <>
            {messages.length > 0 &&
                messages.map((message) => (
                    <div className={message.className} key={message.messageID + Math.random()} id={message.messageID}>
                        <p className="meta">
                            <span className="username">{message.username}</span>
                            <span className="time">
                                {message.time}
                            </span>
                        </p>
                        <p className="text font-w-normal">
                            {message.text}
                        </p>
                    </div>
                ))
            }

        </>
    );
}

export default Message;