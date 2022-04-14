import React, { useState } from 'react';
import axios from 'axios'
import AddItem from './AddItem';
import { Modal, Button, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';

const ItemsData = (props) => {

    const state = {
        loading: false,
        addingItem: false
    }
    const defaultImgSrc = '/img/default_box.jpg'

    /* ITEMS LIST */
    const [ItemsList, setItemsList] = useState(
        [
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },
            { id: 1, title: 'TestName', locationString: "Warehouse1/MyDepartment1/Row1", description: 'TestDescription', quantity: 5 },


        ]
    );

    /* SEARCH */

    /* Table rendering*/

    const renderTable = (itemsList) => {
        return (
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Place</th>
                        <th scope="col">Qtt.</th>
                        <th scope="col">Time added</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsList.map(item =>
                        <tr>
                            <th scope="row" ><img height="40px" width='40px' src={defaultImgSrc} alt="defImg" /></th>
                            <td>{item.title}</td>
                            <td>
                                <OverlayTrigger
                                    placement={'top'}
                                    overlay={
                                        <Tooltip>
                                            {item.locationString}
                                        </Tooltip>
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg>
                                </OverlayTrigger>
                            </td>
                            <td>{item.quantity}</td>
                            <td><p class="font-italic">A few seconds ago...</p></td>
                            <td>
                                <button type="button" class="btn btn-outline-primary btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>

                                </button>
                                <button type="button" class="btn btn-outline-danger btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>

                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    };

    let itemsTable = state.loading
        ? <p><em>Loading...</em></p>
        : renderTable(ItemsList);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (

        <div>
            <div class="alert alert-warning" role="alert">
                
            </div>
            <Row >
                <h2>Items</h2>
                <Button variant="primary" onClick={handleShow}>
                    Add Item
                </Button>
            </Row>
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AddItem />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {itemsTable}
        </div>
    );
}

export default ItemsData;
