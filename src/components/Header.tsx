import './header.css'
import InteractiveName from '../utils/InteractiveName';


function Header(){
    return (
        <>        
        <div className="header">
            <div className="left-section">
            </div>
            <div className="middle-section">
                <button className="task-bar-button"><InteractiveName name={"ATHEESA"}></InteractiveName></button>
            </div>
            <div className="right-section">
            </div>

        </div>
        </>

    )
} 


export default Header;