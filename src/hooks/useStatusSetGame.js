import { useStatusContext } from './useStatusContext';

const useStatusSetGame = () => {

    const { dispatch } = useStatusContext();

    const storageState = JSON.parse(localStorage.getItem('status'));

    const settingPlayers = (players, settingsCondition) => {

        if (storageState) {
            for (let i = 0; i < storageState.players.length; i++) {
                storageState.players[i] = players[i];
            }

            storageState.settingsCondition = settingsCondition;
            
            localStorage.setItem('status', JSON.stringify(storageState));
            dispatch({ type: 'SET_STATUS', payload: storageState });
        }
        else {
            console.error('settingPlayers Error!!!')
        }
    }
    return { settingPlayers };
}

export default useStatusSetGame;