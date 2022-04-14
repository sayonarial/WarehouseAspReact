import { Modal,Form,Button,Col,Row } from "react-bootstrap"
import { useState } from "react";

const ItemModal = ({item, action, active, setActive, save}) => {

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [title,setTitle] = useState('')
    const [quantity,setQuantity] = useState('')
    const [description,setDescription] = useState('')

    const [newItem, setNewItem] = useState(item)

    const handleClose = () => setActive(false);

    const handleShow = () =>{
        if(item){
            setTitle(item.title);
            setQuantity(item.quantity);
            setDescription(item.description);
        }

        setNewItem(item);
    }

    const handleSave = () =>{
        
        handleClose();
    }

    return (
        <Modal
            size="lg"
            show= {active}
            onHide={handleClose}
            onShow={handleShow}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>{action}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form>
            <Row>
                <Col xs={12} md={4}>

                    {/* <img height="200" width="200" src={preview} alt="defImg" /> */}
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload image:</Form.Label>
                        <Form.Control type="file" accept="/*"
                        // onChange={onSelectImg}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Row>
                        <Col xs={12} md={10}>
                            <label for="exampleInputPassword1">Title</label>
                            <Form.Control 
                            placeholder={"Title"} 
                            value = {newItem.title}
                            onChange = {() => setNewItem({})}
                            />
                        </Col>
                        <Col xs={12} md={2}>
                            <label for="exampleInputPassword1">Qtt.</label>
                            <Form.Control 
                            placeholder="" 
                            value={quantity}
                            onChange={() => setQuantity()}
                            />
                        </Col>
                    </Row>

                    <label for="exampleInputPassword1">Description</label>
                    <Form.Control placeholder="" />
                </Col>


            </Row>

        </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ItemModal