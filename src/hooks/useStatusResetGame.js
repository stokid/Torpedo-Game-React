import { useStatusContext } from "./useStatusContext";
import { deletePlayers } from "../game/models/Player";

const useStatusResetGame = () => {

    const { status, dispatch} = useStatusContext();

    const storageState = JSON.parse(localStorage.getItem('status'));

    const statusResetGame = () => {

        deletePlayers();

        if (storageState) {
            storageState.settingsCondition = 0;
            storageState.players = [];
            storageState.messages = [];
            storageState.tempMessages = [];
            
            localStorage.setItem('status', JSON.stringify(storageState));
            dispatch({ type: 'SET_STATUS', payload: storageState });
        }
        else {
            const newStatus = status;
            newStatus.settingsCondition = 0
            newStatus.players = [];
            newStatus.messages = [];
            newStatus.tempMessages = [];
            
            localStorage.setItem('status', JSON.stringify(newStatus));
            dispatch({ type: 'SET_STATUS', payload: newStatus });
        }

    }

    return { statusResetGame }
}

export default useStatusResetGame;