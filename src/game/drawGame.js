/* import Mothership from '../img/ships/mothership' */

export default function drawGame(ctx, canvas, gridNum, squareWidth, shipsImage, inactivePlayer, status = null) {

    //Select  player's statuses
    let inactivePlayerStatus = null;
    if (inactivePlayer) {
        inactivePlayerStatus = inactivePlayer;
    } else {
        inactivePlayerStatus = status.players.filter(player => player.isAtcive === false)[0];

    }

    if (inactivePlayerStatus !== undefined) {

        //Draw unknown squares to all of canvas's area
        ctx.fillStyle = '#405578';
        ctx.fillRect(squareWidth, squareWidth, canvas.width, canvas.width);

        //Clear rect where status has revealedCoordinates
        for (let i = 0; i < inactivePlayerStatus.revealedCoordinates.length; i++) {
            ctx.clearRect(inactivePlayerStatus.revealedCoordinates[i][0] * squareWidth, inactivePlayerStatus.revealedCoordinates[i][1] * squareWidth, squareWidth, squareWidth)
        }

        //Draw coordinates where it has been shotted
        for (let i = 0; i < inactivePlayerStatus.revealedCoordinates.length; i++) {
            for (let ship of inactivePlayerStatus.ships) {

                for (let j = 0; j < ship.shotoutCoordinates.length; j++) {

                    if (ship.shotoutCoordinates[j].every((element, index) => element === inactivePlayerStatus.revealedCoordinates[i][index])) {
                        let dx = inactivePlayerStatus.revealedCoordinates[i][0];
                        let dy = inactivePlayerStatus.revealedCoordinates[i][1];

                        ctx.fillStyle = 'green';
                        ctx.fillRect(dx * squareWidth, dy * squareWidth, squareWidth, squareWidth);
                    }
                }
            }
            for (let ship of inactivePlayerStatus.sunkenShips) {

                for (let j = 0; j < ship.shotoutCoordinates.length; j++) {

                    if (ship.shotoutCoordinates[j].every((element, index) => element === inactivePlayerStatus.revealedCoordinates[i][index])) {
                        let dx = inactivePlayerStatus.revealedCoordinates[i][0];
                        let dy = inactivePlayerStatus.revealedCoordinates[i][1];

                        ctx.fillStyle = 'green';
                        ctx.fillRect(dx * squareWidth, dy * squareWidth, squareWidth, squareWidth);
                    }
                }
            }
        }


        /* --------------------------------------------------------------------------------------- */

        let charNum = 65; // The "A" starts here in the ASCII codetable

        ctx.fillStyle = "#DCDCDC";
        ctx.fillRect(0, 0, canvas.width, canvas.width / gridNum);
        ctx.fillRect(0, 0, canvas.width / gridNum, canvas.width);

        //Drawing letters in vertical and numbers in horizontal
        let num = 1;
        for (let i = (canvas.width / gridNum) * 1.5; i < canvas.width; i += canvas.width / gridNum) {
            let text = String.fromCharCode(charNum);
            ctx.font = "30px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(text, 0, i);
            ctx.fillText(num, i, (canvas.width / gridNum) / 2);
            charNum += 1;
            num += 1;

        }

        //Drawing grid
        for (let i = canvas.width / gridNum; i < canvas.width; i += canvas.width / gridNum) {

            ctx.beginPath();
            //Vertical lines
            ctx.moveTo(i, gridNum);
            ctx.lineTo(i, canvas.width);
            //Horizontal lines
            ctx.moveTo(gridNum, i);
            ctx.lineTo(canvas.width, i);

            ctx.strokeStyle = "f0f0f0";
            ctx.closePath();
            ctx.stroke();
        }

        /* --------------------------------------------------------------------------------------- */


        //Draw ships which is sunken
        if (inactivePlayerStatus.sunkenShips.length > 0) {
            for (let sunkenShip of inactivePlayerStatus.sunkenShips) {

                let maxDx = 0;
                let maxDy = 0;
                let minDx = gridNum;
                let minDy = gridNum;

                for (let coordinate of sunkenShip.shotoutCoordinates) {
                    
                    if (coordinate[0] > maxDx) {
                        maxDx = coordinate[0];
                    }
                    if (coordinate[1] > maxDy) {
                        maxDy = coordinate[1];
                    }
                }
                for (let coordinate of sunkenShip.shotoutCoordinates) {
                    if (coordinate[0] < minDx) {
                        minDx = coordinate[0];
                    }
                    if (coordinate[1] < minDy) {
                        minDy = coordinate[1];
                    }
                }

                if (minDx === maxDx) {
                    //Draw vertical
                    let img = new Image(); // Create new img element

                    switch (sunkenShip.shipName) {
                        case 'mothership':
                            img = shipsImage[0]; // Set source path;
                            break;
                        case 'cruiser':
                            img = shipsImage[1];;
                            break;
                        case 'destroyer':
                            img = shipsImage[2];
                            break;
                        case 'frigate':
                            img = shipsImage[3];
                            break;
                        default: return;
                    }

                    ctx.fillStyle = '#36bf63';
                    ctx.fillRect(minDx * squareWidth, minDy * squareWidth, squareWidth, sunkenShip.length * squareWidth);
                    ctx.drawImage(img, minDx * squareWidth, minDy * squareWidth, squareWidth, sunkenShip.length * squareWidth)

                } else {
                    //Draw horizontal
                    let img = new Image(); // Create new img element

                    switch (sunkenShip.shipName) {
                        case 'mothership':
                            img = shipsImage[4]; // Set source path;
                            break;
                        case 'cruiser':
                            img = shipsImage[5];;
                            break;
                        case 'destroyer':
                            img = shipsImage[6];
                            break;
                        case 'frigate':
                            img = shipsImage[7];
                            break;
                        default: return;
                    }

                   /*  console.log(img); */

                    ctx.fillStyle = '#36bf63';
                    ctx.fillRect(minDx * squareWidth, minDy * squareWidth, sunkenShip.length * squareWidth, squareWidth);
                    ctx.drawImage(img, minDx * squareWidth, minDy * squareWidth, sunkenShip.length * squareWidth, squareWidth)
                }
            }
        }
    }

    return true;
}