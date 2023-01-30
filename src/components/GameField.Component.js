import { useRef } from 'react'

import { useStatusContext } from '../hooks/useStatusContext';

import PlayerSetter from './PlayerSetter.Component';

import './GameField.Component.css';

import Torpedo from '../game/Torpedo';



const GameField = ({ width, height }) => {

    const { status } = useStatusContext()

    const gameFieldRef = useRef()
    
    return (
        <div className='GameField' ref={gameFieldRef}
            style={{ width: width, height: height }}
        >
        {status.settingsCondition === 0 &&
            <PlayerSetter/>
        }
        {status.settingsCondition >= 1 &&
        <Torpedo/>
        }
        </div>
    );
}

export default GameField;