import { ships } from './models/Ship'

function addPlayerShips(actualPlayer, coordinate) {

    if (coordinate.length === 2) {
        const shipID = actualPlayer.ships.length
        if (shipID >= ships.length) {
            console.error(`No more ship!`);
            return {senderID: -1, type: -5, text: 'No more ship!'};
        }
        let result = actualPlayer.addShipCoordinate(actualPlayer.playerID, shipID, coordinate)
        if (!result) {
            console.error(result)
            return result;
        }
        else if (result.type < 0) {
            console.error('------------------ Error addSip player: -------------------');
            /* console.error(result) */
            return result;

        }
        else if (result.type === 0) {
            return result;
        }
        else if (result.type === 1) {
            return result;
        }
        else {
            if (actualPlayer.ships.length === ships.length) {
                return result;
            }
        }
    }
}

export default addPlayerShips;