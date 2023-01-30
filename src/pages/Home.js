import { useRef, useState, useEffect } from 'react';
import useInitStatusSetBoard from '../hooks/useInitStatusSetBoard';

import MainField from "../components/MainField.Component";
import GameField from "../components/GameField.Component";

import './Home.css';

const Home = () => {

    const { initStatusSetBoard } = useInitStatusSetBoard();
    

    const [gameFieldStyle, setGameFieldStyle] = useState(
        {
            width: null,
            height: null
        }
    );
    const [mainFieldStyle, setMainFieldStyle] = useState(
        {
            width: null,
            height: null
        }
    );

    const homeRef = useRef(null);

    const [isVertical, setIsVertical] = useState(null);

    useEffect(() => {

        if (window.innerWidth < window.innerHeight) {
            homeRef.current.style.flexDirection = "";
            setIsVertical(false);
            setMainFieldStyle({
                width: window.innerWidth -1 + "px",
                height: (window.innerHeight - window.innerWidth) -1 + "px"
            });
            setGameFieldStyle({
                width: window.innerWidth -1 + "px",
                height: window.innerWidth -1 + "px"
            });
            initStatusSetBoard(window.innerWidth, window.innerWidth)
        } else {
            homeRef.current.style.flexDirection = "row";
            setIsVertical(true);
            setMainFieldStyle({
                width: (window.innerWidth - window.innerHeight) -1 + "px",
                height: window.innerHeight -1 + "px"
            }
            );
            setGameFieldStyle({
                width: window.innerHeight -1 + "px",
                height: window.innerHeight -1 + "px"
            }
            );
            initStatusSetBoard(window.innerHeight, window.innerHeight)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   

    return (
        <div className='home' ref={homeRef}>
            {isVertical && (
                <>
                    <GameField
                        width={gameFieldStyle.width}
                        height={gameFieldStyle.height}
                    />
                    <MainField
                        width={mainFieldStyle.width}
                        height={mainFieldStyle.height}
                    />
                </>
            )
            }
            {!isVertical && (
                <>
                    <MainField
                        width={mainFieldStyle.width}
                        height={mainFieldStyle.height}
                    />
                    <GameField
                        width={gameFieldStyle.width}
                        height={gameFieldStyle.height}
                    />
                </>
            )
            }
        </div>
    );
}

export default Home;