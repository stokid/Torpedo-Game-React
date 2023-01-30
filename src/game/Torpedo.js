import { useRef, useState, useEffect } from 'react'

import { useStatusContext } from "../hooks/useStatusContext";
import useStatusSetGame from '../hooks/useStatusSetGame'
import useStatusSetMessage from '../hooks/useStatusSetMessage';

import { players, addPlayer, getPlayer, getCurrentPlayer, changePlayer, getOtherPlayer } from './models/Player';
import { addChatMessage } from '../components/Chat.Component'

import Notification from '../components/Notification.Component'

import './Torpedo.css'
import drawGame from './drawGame';
import addPlayerShips from './addPlayerShips';

const numberOfGrid = 10;

// Preload game assets
const loadImage = src => {
    const img = new Image();
    img.src = src;
    return img;
}

const Torpedo = () => {
    function notificationComponentTimeoutFunction() {
        setNotification(false);
    };

    const { status } = useStatusContext();
    const { settingPlayers } = useStatusSetGame();
    const { statusSetTempMessage } = useStatusSetMessage();

    const canvasRef = useRef();

    const [actualPlayer, setActualPlayer] = useState(null);
    const [notification, setNotification] = useState(true);
    const [clickBoardIsActive, setClickBoardIsActive] = useState(false);
    const [squareWidth, setSquareWidth] = useState(null);
    const [shipEventID, setShipEventID] = useState(null);

    const [shipsImage, setShipsImage] = useState([]);

    useEffect(() => {
        setNotification(true);

        if (status.settingsCondition >= 2) {
            setTimeout(notificationComponentTimeoutFunction, 1000);
        }
    }, [status.settingsCondition]);

    //Game event messages
    useEffect(() => {
        let tempMessage;
        if (status.settingsCondition < 4) {
            if (shipEventID === 0) {
                tempMessage = 'Helyezd el az anyahajót!\n Hossza: 4';
            } else if (shipEventID === 1) {
                tempMessage = 'Helyezd el az cirkálót!\n Hossza: 3';
            } else if (shipEventID === 3) {
                tempMessage = 'Helyezd el az rombolót!\n Hossza: 2';
            } else if (shipEventID === 2) {
                tempMessage = 'Helyezd el az fregattot!\n Hossza: 2';
            }
        }
        //Set message if someone has won.
        if (status.settingsCondition === 1000) {
            const winnerPlayer = status.players.filter(player => player.playStatus === 'winner');
            tempMessage = `${winnerPlayer[0].name} a győztes!`;
        }
        if (tempMessage) {
            const message = addChatMessage(-1, 1, tempMessage)
            statusSetTempMessage(message);

        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shipEventID]);

    //Init players
    useEffect(() => {

        setSquareWidth(status.board.width / numberOfGrid);
        setShipEventID(0)


        const mothership_vertical = loadImage('images/mothership_vertical.png');
        const frigate_vertical = loadImage('images/frigate_horizontal_vertical_216x80.png');
        const destroyer_vertical = loadImage('images/Arleigh_Burke-class_destroyer_vertical_75x144.png');
        const cruiser_vertical = loadImage('images/cruiser_vertical_116x205.png');
        const mothership_horizontal = loadImage('images/mothership_horizontal.png');
        const frigate_horizontal = loadImage('images/frigate_horizontal_216x72.png');
        const destroyer_horizontal = loadImage('images/Arleigh_Burke-class_destroyer_horizontal_144x75.png');
        const cruiser_horizontal = loadImage('images/cruiser_horizontal_216x72.png');

        setShipsImage([...shipsImage,
            mothership_vertical, frigate_vertical, destroyer_vertical, cruiser_vertical,
            mothership_horizontal, frigate_horizontal, destroyer_horizontal, cruiser_horizontal])



        if (status.settingsCondition === 1) {
            for (let i = 0; i < status.players.length; i++) {
                addPlayer(i, status.players[i].name);
            }
            const player = getPlayer(0);
            player.isAtcive = true;
            setActualPlayer(player);
            settingPlayers(players, 2);
        }
        if (status.settingsCondition >= 2) {
            for (let i = 0; i < status.players.length; i++) {
                addPlayer(i, status.players[i].name, status.players[i].isAtcive, status.players[i].playStatus, status.players[i].ships, status.players[i].revealedCoordinates, status.players[i].sunkenShips);
            }
            const player = getCurrentPlayer();
            setActualPlayer(player);
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Draw canvas
    useEffect(() => {

        if (!notification) {

            setClickBoardIsActive(true);
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            ctx.globalAlpha = 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGame(ctx, canvas, numberOfGrid, squareWidth, shipsImage, null, status);
            //Grid(ctx, canvas, numberOfGrid);
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status.settingsCondition, notification, shipsImage]);

    const handleClickBoard = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const canvasX = e.nativeEvent.offsetX;
        const canvasY = e.nativeEvent.offsetY;

        const dx = (Math.floor(canvasX / squareWidth));
        const dy = (Math.floor(canvasY / squareWidth));
        if (dx === 0 || dy === 0) {
            return;
        }
        const coordinate = [dx, dy];
        //setCoordinate([dx, dy]);

        //Put down ships
        if (clickBoardIsActive && status.settingsCondition < 4) {
            ctx.beginPath();
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(dx * squareWidth + 2, dy * squareWidth + 2, squareWidth - 4, squareWidth - 4);
            ctx.stroke();
            const result = addPlayerShips(actualPlayer, coordinate);

            if (result.type < 0) {
                const message = addChatMessage(result.senderID, result.type, result.text)
                statusSetTempMessage(message);
            }
            else if (result.type === 1) {
                /* const message = addChatMessage(result.senderID, result.type, result.text )
                statusSetTempMessage(message); */
                setShipEventID(shipEventID + 1);
            }
            else if (result.type === 2) {
                const message = addChatMessage(result.senderID, result.type, result.text)
                statusSetTempMessage(message);
                let resultPlayersGame;
                setClickBoardIsActive(false);
                changePlayer();
                if (status.settingsCondition === 2) {
                    resultPlayersGame = [players, 3];
                    //setRefreshBoard(1);
                }
                else if (status.settingsCondition === 3) {
                    resultPlayersGame = [players, 4];
                    //setRefreshBoard(2);
                }

                setTimeout(setPlayersGameTimeoutFunction, 2000);
                function setPlayersGameTimeoutFunction() {
                    setShipEventID(0);
                    settingPlayers(...resultPlayersGame);
                };

            }
        }

        //Shot ships and results
        if (clickBoardIsActive && status.settingsCondition >= 4 && status.settingsCondition < 1000) {
            ctx.beginPath();
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(dx * squareWidth + 5, dy * squareWidth + 5, squareWidth - 10, squareWidth - 10);
            ctx.stroke();

            let player = getCurrentPlayer();
            let inactivePlayer = getOtherPlayer()

            const result = player.shotShips(coordinate);

            if (result === 1000) {

                ctx.globalAlpha = 1;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawGame(ctx, canvas, numberOfGrid, squareWidth, shipsImage, inactivePlayer);

                setClickBoardIsActive(false);
                setTimeout(setPlayersGameTimeoutFunction, 2000);
                function setPlayersGameTimeoutFunction() {
                    setShipEventID(1000);
                    settingPlayers(players, 1000);
                };

            }
            else if (result !== -4) {

                ctx.globalAlpha = 1;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawGame(ctx, canvas, numberOfGrid, squareWidth, shipsImage, inactivePlayer);

                setClickBoardIsActive(false)
                changePlayer();
                player = getCurrentPlayer();
                setTimeout(setPlayersGameTimeoutFunction, 2000);
                function setPlayersGameTimeoutFunction() {
                    settingPlayers(players, status.settingsCondition + 1);
                    setClickBoardIsActive(true);
                };
            }
        }

        setActualPlayer(getCurrentPlayer());

    }


    return (
        <>
            {actualPlayer && (status.settingsCondition === 2 || status.settingsCondition === 3) && notification &&
                <Notification
                    playerName={actualPlayer.name}
                    notification='Jelöld be a hajóid helyzetét!'
                />
            }
            {actualPlayer && status.settingsCondition >= 4 && status.settingsCondition < 1000 && notification &&
                <Notification
                    playerName={actualPlayer.name}
                    notification='Támadás'
                />
            }
            {actualPlayer && status.settingsCondition === 1000 && notification &&
                <Notification
                    playerName={actualPlayer.name}
                    notification='GYŐZELEM!!!'
                />
            }
            {status.settingsCondition >= 1 && !notification &&
                <canvas id='canvas'
                    ref={canvasRef}
                    width={status.board.width}
                    height={status.board.width}
                    onClick={handleClickBoard}
                >
                </canvas>
            }
        </>

    )
}

export default Torpedo;