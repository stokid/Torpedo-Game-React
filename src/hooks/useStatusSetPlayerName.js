import { useStatusContext } from './useStatusContext';

const useStatusSetPlayerName = () => {

    const { dispatch } = useStatusContext();

    const storageState = JSON.parse(localStorage.getItem('status'));

    const statusSetPlayerName = (...players) => {

        let i = 0;
        for( let player of players) {
            storageState.players[i] = {
                playerID: i,
                name: player
            }
            i++;
        }
        storageState.settingsCondition = 1;
        
        localStorage.setItem('status', JSON.stringify(storageState));

        dispatch({ type: 'SET_STATUS', payload: storageState });

    }

    return { statusSetPlayerName };

}

export default useStatusSetPlayerName;