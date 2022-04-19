import { useState } from "react";
import './ListElement.css'

const ListElement = ({ value }) => {

    const [showControls, setShowControls] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(value);
    const [isActive, setIsActive] = useState(false);


    const updateStorageName = async (e) => {
        e.preventDefault();
        setIsEditing(false);

        try {

        } catch (error) {

        }
    }

    const cancelEditing = () => {
        setIsEditing(false);
        setTitle(value)
    }

    let className = 'storageElement';
    if(isActive){
        className += ' active'
    }

    return (

        isEditing ?
           
                <form onSubmit={updateStorageName}>
                    <input
                        value={title}
                        onInput={(e) => setTitle(e.target.value)}
                    />
                    <button type='submit' role="img" aria-label="ok" >✔️</button>
                    <button role="img" type='reset' aria-label="cancel" onClick={cancelEditing}>❌</button>
                </form>
            :
                <div
                    className={className}
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                >
                    {title}
                    {showControls ?
                        <div>
                            <span role="img" aria-label="delete">🗑️</span>
                            <span role="img" aria-label="edit" onClick={() => setIsEditing(true)}>🖊️</span>
                            <span role="img" aria-label="add">➕</span>
                        </div>
                        :
                        <></>
                    }


                </div>

    )

}


export default ListElement 
