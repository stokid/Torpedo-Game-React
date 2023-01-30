import { useContext } from 'react';
import { StatusContext } from '../contexts/StatusContext';

export const useStatusContext = () => {
    const context = useContext(StatusContext)


    if (!context) {
        throw Error('useStatusContext must be used inside an StatusContextProvider.');
    }

    return context
}