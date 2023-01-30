

import { useStatusContext } from "./useStatusContext";

const useStatusSetMessage = () => {

    const { dispatch } = useStatusContext();

    const storageState = JSON.parse(localStorage.getItem('status'));

    const statusSetMessages = ({messageID, playerID, type, text, time}) => {

        if (storageState) {

            const newMessage = {
                messageID: messageID,
                playerID: playerID, // -1: Webgames Bot, 0: player[0], 1: player[1]
                type: type, // x < 0 ---> Error messages; x > = 0 ---> Other messages
                text: text,
                time: time
                
            }

            storageState.messages.push(newMessage);

            localStorage.setItem('status', JSON.stringify(storageState));
            dispatch({ type: 'SET_STATUS', payload: storageState });

        }
        else {
            console.error('Error in satusMessage.');
        }

    }

    const statusSetTempMessage = ({messageID, playerID, type, text, time}) => {

        if (storageState) {

            const newTempMessage = {
                messageID: messageID,
                playerID: playerID, // -1: Webgames Bot, 0: player[0], 1: player[1]
                type: type, // x < 0 ---> Error messages; x > = 0 ---> Other messages
                text: text,
                time: time
                
            }

            storageState.tempMessages.push(newTempMessage);

            localStorage.setItem('status', JSON.stringify(storageState));
            dispatch({ type: 'SET_STATUS', payload: storageState });

        }
        else {
            console.error('Error in satusMessage.');
        }

    }

    const resetStatusTempMessage = () => {

        if (storageState) {

            storageState.tempMessages = [];

            localStorage.setItem('status', JSON.stringify(storageState));
            dispatch({ type: 'SET_STATUS', payload: storageState });

        }
        else {
            console.error('Error in satusMessage.');
        }

    }

    return { statusSetMessages, statusSetTempMessage, resetStatusTempMessage }

}

export default useStatusSetMessage;