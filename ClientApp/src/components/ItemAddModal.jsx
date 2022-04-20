import { Modal,Form,Button,Col,Row } from "react-bootstrap"
import { useState, useEffect } from "react";

const ItemAddModal = ({ active, setActive, save}) => {

    const [item, setItem] = useState({
        title: '',
        description: '',
        quantity: '',
        serialNumber: 0,
        weight: 0,
        lastUpdated: Date.now(),
        imageName: ''
        
    })

    const handleClose = () => setActive(false);

    const handleSave = () =>{
        setItem({lastUpdated: Date.now()})
        save(item);
        handleClose();
    }

    
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview('/img/default_box.jpg')
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectImg = e => {
        if(!e.target.files || e.target.files.lenght === 0){
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    return (
        <Modal
            size="lg"
            show= {active}
            onHide={handleClose}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form>
            <Row>
                <Col xs={12} md={4}>

                    <img height="200" width="200" src={preview} alt="defImg" />
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload image:</Form.Label>
                        <Form.Control type="file" accept="/*"
                            onChange={onSelectImg}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Row>
                        <Col xs={12} md={10}>
                            <label for="exampleInputPassword1">Title</label>
                            <Form.Control 
                            placeholder={"Title"} 
                            value = {item.title}
                            onChange = {e => setItem({...item, title: e.target.value})}
                            />
                        </Col>
                        <Col xs={12} md={2}>
                            <label for="exampleInputPassword1">Qtt.</label>
                            <Form.Control 
                            placeholder="" 
                            value={item.quantity}
                            onChange = {e => setItem({...item, quantity: e.target.value})}
                            />
                        </Col>
                    </Row>

                    <label for="exampleInputPassword1">Description</label>
                    <Form.Control 
                        placeholder=""
                        value={item.description}
                        onChange = {e => setItem({...item, description: e.target.value})}
                    />
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
export default ItemAddModal