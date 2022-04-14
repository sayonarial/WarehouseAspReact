import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { render } from "react-dom";
import StorageItem from "./UI/StorageItem";

const Warehouses = (props) => {


    const [storagesList, setStoragesList] = useState([
        { id: 1, parrentId: 0, title: 'MyWarehouse1' },
        { id: 2, parrentId: 0, title: 'MyWarehouse2' },
        { id: 3, parrentId: 1, title: 'MyDepartment1' },
        { id: 4, parrentId: 2, title: 'MyDepartment2' },
        { id: 5, parrentId: 3, title: 'Row1' },
        { id: 6, parrentId: 3, title: 'Row2' },
        { id: 7, parrentId: 6, title: 'LeftSide' },
    ])

    const TreeItem = (parrentId) => {
            
                {storagesList.filter(storage => storage.parrentId === parrentId).forEach(
                    s => {

                        if (storagesList.some(storage => storage.parrentId === s.id)) {
                            <ul>
                                <StorageItem value={s.title} />
                                {TreeItem(parrentId = s.id)}
                            </ul>
                        }
                        else {
                            <li>
                                <StorageItem value={s.title} />
                            </li>
                        }
                    }

                )}

    }

    const CreateItemTree = () => {
        return (
            <>

            </>
        )
    }


    return (
        <>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>My Warehouses</Accordion.Header>
                    <Accordion.Body>
                        <StorageItem value='All' />
                        {console.log(TreeItem())}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );

}



export default Warehouses;