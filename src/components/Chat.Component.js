import { useState, useEffect, useRef } from 'react';

//Context files
import { useStatusContext } from '../hooks/useStatusContext';
import useStatusSetMessage from '../hooks/useStatusSetMessage';

//Style files
import './Chat.Component.css';

//Component files
import Message from './Message.Component';

const Chat = () => {

    const { status } = useStatusContext();
    const { statusSetMessages, resetStatusTempMessage } = useStatusSetMessage();

    const chatMessagesRef = useRef()

    const [messages, setMessages] = useState([]);
    const [actualMessage, setActualMessage] = useState("");

    //Scroll down to the newest messages
    useEffect(() => {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }, [messages]);

    //Init messages
    useEffect(() => {
        if (status.settingsCondition >= 2 && messagesArr.length <= 3) {
            if (status.messages.length > 0) {
                // Copy messagesArr after 2. element because 1. and 2. element is rendererd before its;
                let formattedMessagesArr = [];
                for (let messageObj of status.messages) {
                    const newMessageObj = addChatMessage(messageObj.playerID, messageObj.type, messageObj.text, messageObj.time);
                    const formattedMessage = formMessage(newMessageObj, status.players);
                    formattedMessagesArr.push(formattedMessage);
                }
                setMessages([...messages, ...formattedMessagesArr]);
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status.settingsCondition])

    useEffect(() => {
        if (status.settingsCondition === 0) {
            const newMessageObj = addChatMessage(-1, 5, "Üdvözöllek a Torpedó játékban! Add meg a játékosok neveit és indulhat is a játék! Ha még nem ismered a működését, a menüben megtalálod a leírást!");
            const formattedMessage = formMessage(newMessageObj, status.players);
            setMessages([...messages, formattedMessage]);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status.settingsCondition]);


    //Display Game feedback
    useEffect(() => {
        if (status.tempMessages.length > 0) {
            const newMessageObj = status.tempMessages[status.tempMessages.length - 1];
            const formattedMessage = formMessage(newMessageObj, status.players);
            setMessages([...messages, formattedMessage]);
            resetStatusTempMessage();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status.tempMessages]);

    const handleInput = (e) => {
        setActualMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let playerID;

        if (status.settingsCondition > 0) {
            if (status.players[0].isAtcive) {
                playerID = status.players[0].playerID;
            } else {
                playerID = status.players[1].playerID;
            }
            const newMessageObj = addChatMessage(playerID, 3, actualMessage);
            statusSetMessages(newMessageObj);
            const formattedMessage = formMessage(newMessageObj, status.players);
            setMessages([...messages, formattedMessage]);

            // Clear input
            setActualMessage('');

        } else {
            console.error('You have to set players!')
        }
    }


    return (
        <div className="Chat">
            <div id="chatMessages" className="chatMessages" ref={chatMessagesRef}>
                {messages.length > 0 && <Message messages={messages} />}
            </div>
            <form id="messageForm" className="messageForm" action="" method="" autoComplete="off" onSubmit={handleSubmit}>
                <input id="messageInput" className="messageInput font-w-normal" type="text" required value={actualMessage} onChange={handleInput} />
                <input id="messageSubmit" className="messageSubmit" type="submit" value="Küldés" />
            </form>
        </div>
    );
}

export default Chat;

/* -------------------------------------------------- */

export let messagesArr = [];

export function addChatMessage(playerID, type, text, time = null) {
    let messageID;

    if (!time) {
        const date = new Date();
        time = `${date.getHours()}:${((date.getMinutes()) >= 10 ? date.getMinutes() : '0' + date.getMinutes())}`

    }
    if (messagesArr.length === 0) {
        messageID = 0;
    } else {
        messageID = messagesArr[messagesArr.length - 1].messageID + 1;
    }
    const message = new ChatMessage(messageID, playerID, type, text, time);

    messagesArr.push(message);

    return message;
}

function formMessage( newMessageObj, players ) {

    const { messageID, playerID, type, text, time } = newMessageObj;

    let username = 'WebGames Bot';
    let className = 'Message';

    if (playerID === 0) {
        className = className.concat(' ', 'sendMessage');
    } else if (playerID === 1) {
        className = className.concat(' ', 'getMessage');
    }
    if (type < 0) {
        className = className.concat(' ', 'error');
    }
    if (type === 2) {
        className = className.concat(' ', 'succes');
    }

    if (playerID >= 0) {
        if (playerID === 0) {
            username = players[0].name;
        } else {
            username = players[1].name;
        }
    }

    const formattedMessage = {
        messageID: messageID,
        playerID: playerID,
        username: username,
        text: text,
        type: type,
        time: time,
        className: className
    }
    return formattedMessage;
}

class ChatMessage {
    constructor(messageID, playerID, type, text, time) {
        this.messageID = messageID
        this.playerID = playerID
        this.type = type
        this.text = text
        this.time = time
    }
}