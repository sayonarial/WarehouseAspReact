import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { render } from "react-dom";
import Storage from "./Storage";
import ListElement from "./UI/ListElement";

const Warehouses = (props) => {


    const [storagesList, setStoragesList] = useState([

        {
            id: 4,
            userId: 1,
            title: 'Warehouse1',
            childStorages: [
                {
                    id: 5,
                    userId: 1,
                    title: 'Department1',
                    childStorages: [
                        {
                            id: 7,
                            userId: 1,
                            title: 'Row1',
                            childStorages: [
                                {
                                    id: 11,
                                    userId: 1,
                                    title: 'left side',
                                    childStorages: [],
                                    storageId: 7
                                }
                            ],
                            storageId: 5
                        },
                        {
                            id: 9,
                            userId: 1,
                            title: 'TestRow',
                            childStorages: [],
                            storageId: 5
                        }
                    ],
                    storageId: 4
                },
                {
                    id: 6,
                    userId: 1,
                    title: 'Department2',
                    childStorages: [],
                    storageId: 4
                }
            ],
            storageId: null
        },
        {
            id: 4,
            userId: 1,
            title: 'Warehouse2',
            childStorages: [
                {
                    id: 5,
                    userId: 1,
                    title: 'Department1',
                    childStorages: [
                        {
                            id: 7,
                            userId: 1,
                            title: 'Row1',
                            childStorages: [
                                {
                                    id: 11,
                                    userId: 1,
                                    title: 'left side',
                                    childStorages: [
                                        {
                                            id: 11,
                                            userId: 1,
                                            title: 'left side',
                                            childStorages: [],
                                            storageId: 7
                                        },
                                        {
                                            id: 11,
                                            userId: 1,
                                            title: 'left side',
                                            childStorages: [],
                                            storageId: 7
                                        },
                                        {
                                            id: 11,
                                            userId: 1,
                                            title: 'left side',
                                            childStorages: [],
                                            storageId: 7
                                        }
                                    ],
                                    storageId: 7
                                }
                            ],
                            storageId: 5
                        },
                        {
                            id: 9,
                            userId: 1,
                            title: 'TestRow',
                            childStorages: [],
                            storageId: 5
                        }
                    ],
                    storageId: 4
                },
                {
                    id: 6,
                    userId: 1,
                    title: 'Department2',
                    childStorages: [],
                    storageId: 4
                }
            ],
            storageId: null
        },
    ])

    return (
        <>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>My Warehouses</Accordion.Header>
                    <Accordion.Body>
                        
                            <ListElement value={'All'} isActive = {true}/>
                            {storagesList.map((s) =>
                                <Storage storageItem={s} />
                            )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );

}


export default Warehouses;


// { id: 1, parrentId: 0, title: 'MyWarehouse1' },
// { id: 2, parrentId: 0, title: 'MyWarehouse2' },
// { id: 3, parrentId: 1, title: 'MyDepartment1' },
// { id: 4, parrentId: 2, title: 'MyDepartment2' },
// { id: 5, parrentId: 3, title: 'Row1' },
// { id: 6, parrentId: 3, title: 'Row2' },
// { id: 7, parrentId: 6, title: 'LeftSide' },