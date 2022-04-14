import { Form, Button, Row, Col } from "react-bootstrap"
import { useState,useEffect } from "react";

const AddItem = () => {

    /* IMAGE UPLOAD PREVIEW */

    let defaultImgSrc = '/img/default_box.jpg';

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(defaultImgSrc)
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
                            <Form.Control placeholder="Title" />
                        </Col>
                        <Col xs={12} md={2}>
                            <label for="exampleInputPassword1">Qtt.</label>
                            <Form.Control placeholder="" />
                        </Col>
                    </Row>

                    <label for="exampleInputPassword1">Description</label>
                    <Form.Control placeholder="" />
                </Col>


            </Row>

        </Form>
    );
}

export default AddItem;