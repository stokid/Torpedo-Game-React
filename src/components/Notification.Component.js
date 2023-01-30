import './Notification.Component.css';


const Notification = ({playerName, notification}) => {
    
    return (  
        <div className='Notification'>
            <h1>
                {playerName}
            </h1>
            <h2>
                {notification}
            </h2>
        </div>
    );
}
 
export default Notification;