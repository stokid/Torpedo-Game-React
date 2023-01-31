import { Ship, ships } from "./Ship";

export let players = [];

export function addPlayer(playerID, name, isAtcive, playStatus, inputships, revealedCoordinates, inputSunkenShips) {

    if (players.length > 1) {
        return;
    }
    let player = new Player(playerID, name, isAtcive, playStatus, revealedCoordinates);
    if (inputships) {
        if (inputships.length > 0) {
            for (let inputShip of inputships) {
                player.addShip(inputShip.shipID, inputShip.coordinates, inputShip.isSunken, inputShip.shotoutCoordinates)
            }
        }
    }
    if (inputSunkenShips) {
        if (inputSunkenShips.length > 0) {
            for (let inputSunkenShip of inputSunkenShips) {
                player.addSunkenShip(inputSunkenShip.shipID, inputSunkenShip.shipName, inputSunkenShip.length, inputSunkenShip.coordinates, inputSunkenShip.isSunken, inputSunkenShip.shotoutCoordinates)
            }
        }
    }

    players.push(player);
}
export function getPlayer(playerID) {

    const player = players.filter(player => player.playerID === playerID);
    return player[0];
}
export function getCurrentPlayer() {
    const currentPlayer = players.filter(player => player.isAtcive === true);
    return currentPlayer[0];
}
export function getOtherPlayer() {
    const otherPlayer = players.filter(player => player.isAtcive === false);

    return otherPlayer[0];
}
export function changePlayer() {
    const currentPlayer = players.filter(player => player.isAtcive === true);
    const otherPlayer = players.filter(player => player.isAtcive === false);
    currentPlayer[0].isAtcive = false;
    otherPlayer[0].isAtcive = true;
    return;
}
export function deletePlayers() {
    players = [];
}

const kindOfPlayStatus = ['init', 'onPlay', 'winner', 'loser', 'offline', 'givenup'];



class Player {

    //This variables  Places ship's coordinates 
    coordinatesPuffer = [];
    lineType; // 1 ==> horizontal, 2 ==> vertical

    constructor(playerID, name, isAtcive = false, playStatus = kindOfPlayStatus[0], revealedCoordinates = [], ships = [], sunkenShips = []) {
        this.playerID = playerID
        this.name = name
        this.isAtcive = isAtcive
        this.ships = ships
        this.playStatus = playStatus
        this.sunkenShips = sunkenShips
        this.revealedCoordinates = revealedCoordinates

    }
    addShipCoordinate(playerID, shipID, coordinate) {
        if (shipID >= ships.length) {
            console.error('No more ship!')
            return -5; // No more ship!
        }
        if (this.coordinatesPuffer.length === 1) {
            if (!this.lineType) {
                if ((this.coordinatesPuffer[0][0] + 1 === coordinate[0] || this.coordinatesPuffer[0][0] - 1 === coordinate[0]) &&
                    this.coordinatesPuffer[0][1] === coordinate[1]) {
                    this.lineType = 1;
                } else if ((this.coordinatesPuffer[0][1] + 1 === coordinate[1] || this.coordinatesPuffer[0][1] - 1 === coordinate[1]) &&
                    this.coordinatesPuffer[0][0] === coordinate[0]) {
                    this.lineType = 2;
                } else {
                    console.error('At start, it is not known vertical or horizontal! ');
                    return { senderID: -1, type: -4, text: 'A hajó részeit függőlegesen, vagy vízszintesen tudod elhelyezni egymást követő mezőkre kattintva!' }; // Invalid field! 
                }
            }
        }
        let lastCoordinate = this.coordinatesPuffer[this.coordinatesPuffer.length - 1];

        let player = getPlayer(playerID)
        let isOccupied = false;
        for (let i = 0; i < player.ships.length; i++) {
            for (let j = 0; j < player.ships[i].length; j++) {
                if (player.ships[i].coordinates[j].every((element, index) => (element === coordinate[index]))) {
                    isOccupied = true;
                    console.error('This filed is occupied!')
                    return { senderID: -1, type: -3, text: 'Ezt a mezőt már kijelölted egyszer!' }; // Invalid field!
                }
            }
        }

        for (let i = 0; i < this.coordinatesPuffer.length; i++) {
            if (this.coordinatesPuffer[i].every((element, index) => (element === coordinate[index]))) {
                isOccupied = true;
                console.error('This filed is occupied!')
                return { senderID: -1, type: -3, text: 'Ezt a mezőt már kijelölted egyszer!' }; // Invalid field!
            }
        }

        if (isOccupied) {
            console.error('This filed is occupied!')
            return { senderID: -1, type: -3, text: 'Ezt a mezőt már kijelölted egyszer!' }; // Invalid field!
        }
        if (this.lineType === 1) {

            if (lastCoordinate[1] !== coordinate[1]) {
                console.error('Line has to be horizontal')
                return { senderID: -1, type: -2, text: 'Ezt a hajót vízszintesen kell kijelölnöd!' }; // Invalid field!
            }
            if (lastCoordinate[0] !== coordinate[0] + 1 && lastCoordinate[0] !== coordinate[0] - 1
                && this.coordinatesPuffer[0][0] !== coordinate[0] + 1 && this.coordinatesPuffer[0][0] !== coordinate[0] - 1) {
                console.error('This field is too far (horizontal).')
                return { senderID: -1, type: -2, text: 'A kijelölt mező túl messze van az utolsónak lerakotthoz képest!' }; // Invalid field!
            }
        }
        if (this.lineType === 2) {
            if (lastCoordinate[0] !== coordinate[0]) {
                console.error('Line has to be vertical')
                return { senderID: -1, type: -2, text: 'Ezt a hajót függőleges irányban kell kijelölnöd!' }; // Invalid field!
            }
            if (lastCoordinate[1] !== coordinate[1] + 1 && lastCoordinate[1] !== coordinate[1] - 1
                && this.coordinatesPuffer[0][1] !== coordinate[1] + 1 && this.coordinatesPuffer[0][1] !== coordinate[1] - 1) {
                console.error('This field is too far (vertical).')
                return { senderID: -1, type: -2, text: 'A kijelölt mező túl messze van az utolsónak lerakotthoz képest!' }; // Invalid field!
            }
        }

        this.coordinatesPuffer.push(coordinate);
        const ship = ships[shipID];
        if (ship.length === this.coordinatesPuffer.length) {
            let newShip = new Ship(ships[shipID].shipID, ships[shipID].shipName, ships[shipID].length, this.coordinatesPuffer);
            this.coordinatesPuffer = [];
            this.lineType = undefined;
            this.ships.push(newShip);
            if (this.ships.length === ships.length) {
                player.playStatus = kindOfPlayStatus[1]; // onPlay
                return { senderID: -1, type: 2, text: 'Sikeresen elhelyezted a hajóidat.' };
            }

            return { senderID: -1, type: 1, text: 'Successul newShip.' };
        }
        return { senderID: -1, type: 0, text: 'Added coordinate.' }; // Added a coordinate
    }

    addShip(shipID, coordinates, isSunken, shotoutCoordinates) {
        let ship1 = new Ship(ships[shipID].shipID, ships[shipID].shipName, ships[shipID].length, coordinates, isSunken, shotoutCoordinates);
        this.ships.push(ship1);
    }
    addSunkenShip(shipID, shipName, length, coordinates, isSunken, shotoutCoordinates) {
        const ship1 = new Ship(shipID, shipName, length, coordinates, isSunken, shotoutCoordinates)
        this.sunkenShips.push(ship1)
    }

    shotShips(shotCoordinate) {
        const otherPlayer = getOtherPlayer();
        if (otherPlayer.revealedCoordinates.length > 0) {
            for (let revCoordinate of otherPlayer.revealedCoordinates) {
                if (revCoordinate.every((element, index) => element === shotCoordinate[index])) {
                    console.error(' ------------------- shotShips This coordinate has been revealed; ')
                    return -4; // This coordinate has been revealed;
                }
            }
        }
        otherPlayer.revealedCoordinates.push(shotCoordinate);
        let result;
        for (let ship of otherPlayer.ships) {

            result = ship.shot2(shotCoordinate);

            if (result === 2) {

                const index = otherPlayer.ships.indexOf(ship);
                otherPlayer.sunkenShips.push(ship);
                otherPlayer.ships.splice(index, 1);

                if (otherPlayer.ships.length === 0) {
                    result = 1000; // WINNER
                    otherPlayer.playStatus = kindOfPlayStatus[3];
                    this.playStatus = kindOfPlayStatus[2];
                    return result; // Player wins the game!.
                }
                return result; // This ship had been sunken.
            }
            if (result === -1) {
                return result; //The coordinate has been shotted succesfully yet.
            }
            else if (result > 0) {
                return result; // Successful shot.
            }
        }
        return result;
    }

    checkDefeat() {
        let result;
        for (const ship of this.ships) {
            result = ship.isSunken;
            if (result === false) {
                return false;
            }
        }
        return result; // true --> Player losts
    }
}
