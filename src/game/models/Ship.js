export const ships = [
    {
        shipID: 0,
        shipName: 'mothership',
        length: 4
    },
    {
        shipID: 1,
        shipName: 'cruiser',
        length: 3
    },
    {
        shipID: 2,
        shipName: 'destroyer',
        length: 2
    },
    {
        shipID: 3,
        shipName: 'frigate',
        length: 2
    }
];


export class Ship {

    constructor(shipID, shipName, length, coordinates, isSunken = false, shotoutCoordinates = []) {
        this.shipID = shipID
        this.shipName = shipName
        this.length = length
        this.coordinates = coordinates // Table coordinates in 2d arrays for example [[1,1], [1,2], [1,3]] --> ([[row, column]])
        this.isSunken = isSunken
        this.shotoutCoordinates = shotoutCoordinates
    }

    shot2(shotCoordinate) {

        let result;
        if (this.isSunken === true) {
            console.error('This ship is sunken.');
            result = -2; // This ship had been sunken.
            return result;
        }
        if (result === undefined) {
            for (let shotoutCoordinateArr of this.shotoutCoordinates) {
                if (shotoutCoordinateArr.every((element, index) => element === shotCoordinate[index])) {
                    console.error('The coordinate has been shotted succesfully yet.');
                    result = -1; //The coordinate has been shotted succesfully yet.
                }
            }
        }
        if (result === undefined) {
            for (let coordinateArr of this.coordinates) {
                if (!coordinateArr.every((element, index) => element === shotCoordinate[index])) {
                    console.error('The shot did not take target.');
                    result = 0; // The shot did not take target.
                } else {
                    this.shotoutCoordinates.push(shotCoordinate);
                    if (this.shotoutCoordinates.length === this.coordinates.length) {
                        this.isSunken = true;
                        return result = 2; // Shot hits target and sinks the ship.
                    }

                    else {
                        result = 1; //Shot hits target.
                        return result;
                    }
                };
            }
        }
        if (result === undefined) {
            this.shotoutCoordinates.push(shotCoordinate);
            if (this.shotoutCoordinates.length === this.coordinates.length) {
                this.isSunken = true;
                result = 2; // Shot hits target and sinks the ship.
            }

            else result = 1; //Shot hits target.
        }
        console.log('---------------- Shot Other result ------------------');
        console.log(result)
        return result;
    }
}

