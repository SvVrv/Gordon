import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { disposeCurrentUser } from '../../../actions/authActions';
class LogOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            redirect :false
        };

        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        
    }

    logout() {

        this.setState(prevState => ({
            modal: false,
            redirect: true
        }));
        
    
       
    }
    render() {
        
            const modal=(
                <Modal isOpen={this.state.modal} toggle={this.logout} className={this.props.className}>
                    <ModalHeader toggle={this.logout}></ModalHeader>
                    <ModalBody>
                      Are you sure?
          </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(event) => { this.props.disposeCurrentUser(); this.logout() }}>Logout</Button>{' '}
                        <Button color="secondary" onClick={this.logout}>Cancel</Button>
                    </ModalFooter>
                </Modal>)

        return (
            this.state.redirect ?
                <Redirect to="/" /> :
                modal)
    }
}

export default connect(null, { disposeCurrentUser } )(LogOut);