import { useStatusContext } from './useStatusContext';

const useInitStatusSetBoard = () => {

    const { status, dispatch } = useStatusContext();

    const storageState = JSON.parse(localStorage.getItem('status'));

    const initStatusSetBoard = (width, height) => {

        if (storageState) {
            storageState.board = {
                width: width,
                height: height
            }
            // Save the user to local storage
            localStorage.setItem('status', JSON.stringify(storageState));
            dispatch({ type: 'SET_STATE', payload: storageState });
        }
        else {
            const newStatus = status;
            newStatus.board = {
                width: width,
                height: height
            }
            
            // Save the user to local storage
            localStorage.setItem('status', JSON.stringify(newStatus));
            dispatch({ type: 'SET_STATE', payload: newStatus });
        }
    }

    return { initStatusSetBoard };
}

export default useInitStatusSetBoard;