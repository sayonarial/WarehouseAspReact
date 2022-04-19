import ListElement from './UI/ListElement'
import { useState } from 'react';
import styles from './css/StoragesList.module.css'

const Storage = ({ storageItem, maxLevel}) => {

    return (
        <>
            <li>
            <i class="fas fa-angle-right rotate"></i>
                <ListElement value={storageItem.title}/>
                <ul className={styles.myUl}>
                    {storageItem.childStorages.map((st) =>
                        <Storage storageItem={st} />
                    )} 
                </ul>
            </li>
        </>
    )
}

export default Storage


// {
//     if (storageItem.some(storage => storage.parrentId === s.id)) {
//     <ul >
//         <ListElement IsCollapsible={true} />
//         <Storage storageItem={ } />
//     </ul>
// }
// else {
//     <li>
//         <StorageItem value={s.title} />
//     </li>
// }

// }