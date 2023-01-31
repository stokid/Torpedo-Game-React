import MenuBar from "./MenuBar.Component";
import Chat from './Chat.Component';
import './MainField.Component.css'

function MainField({ width, height }) {

    return (
        <div className='MainField'
            style={{ width: width, height: height }}
        >
            <div className="dashBoard">
                <div id="countDown" className="countDown">CountDown</div>
                <div id="connectionFeedback" className="connectionFeedback">Connection Feedback</div>
                <MenuBar />
            </div>
            <div className="shadowToDashBoard"></div>
            <Chat />
        </div>
    );
}

export default MainField;