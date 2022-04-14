import { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import ItemsData from './ItemsData'
import ItemsTable from "./ItemsTable";
import Warehouses from "./Warehouses";

const UserDashboard = (props) =>{ 

    return(
        <Row>
            <Col xs={3}>
                <Warehouses />
            </Col>
            <Col>
                {/* <ItemsData /> */}
                
                <ItemsTable/>
            </Col>
        </Row>
    );

}

export default UserDashboard;