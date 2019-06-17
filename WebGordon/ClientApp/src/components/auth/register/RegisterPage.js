import React, { Component } from 'react';

class RegisterPage extends Component {
    state = {  }
    render() { 
        return ( 
            <Row>
                <Col md={4} mdOffset={4}>
                    <RegistrationForm />
                </Col>
            </Row> 
        );
    }
}
 
export default RegisterPage;