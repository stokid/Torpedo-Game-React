import { useState } from 'react';

import { useStatusContext } from '../hooks/useStatusContext';
import useStatusSetPlayerName from '../hooks/useStatusSetPlayerName';

import './PlayerSetter.Component.css';

const PlayerSetter = () => {
    const { status } = useStatusContext()
    const { statusSetPlayerName } = useStatusSetPlayerName();

    const [username, setUsername] = useState('');
    const [username2, setUsername2] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (status.settingsCondition === 0) {
            statusSetPlayerName(username, username2)
        }
    }
    return (
        <div className='SetPlayers' >
            <form className="formClass" onSubmit={handleSubmit}>
                <div className="inputFields">
                    <div className="usernameInput">
                        <label htmlFor="username">1. JÁTÉKOS:</label>
                        <input
                            type="text"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="usernameInput">
                        <label htmlFor="username2">2. JÁTÉKOS:</label>
                        <input
                            type="text"
                            name="username2"
                            required
                            value={username2}
                            onChange={(e) => setUsername2(e.target.value)}
                        />
                    </div>
                </div>
                <div className="formSubmitDiv">
                    <input className="submitButton" type="submit" value="START" />
                </div>
            </form>
        </div>
    );
}

export default PlayerSetter;