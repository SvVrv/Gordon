import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm'
import {Row, Col} from 'reactstrap'

class RegisterPage extends Component {
    state = {  }
    render() { 
        return ( 
            // <Row>
            //     <Col md={4} mdOffset={4}>
            //         <RegistrationForm />
            //     </Col>
            // </Row> 
            <div>
                <div><b>Register Page</b></div>
                <Row>
                    <Col></Col>
                    <Col><RegistrationForm /></Col>
                    <Col></Col>
                </Row>
            </div>
        );
    }
}
 
export default RegisterPage;