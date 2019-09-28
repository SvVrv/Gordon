import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import classnames from 'classnames';

class ModalDialog extends React.Component {

    constructor(props) {
        super(props)
    }
    state = {
        show: false,
        name: this.props.name,
        value: this.props.value,
        //name: this.props.children1.name,
        //value: this.props.children1.value,
        children1: this.props.children1,
        errors: {},
    }

    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    value: value,
                    errors
                })
        }
        else {
            this.setState(
                { value: value })
        }
    }

    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }

    handleClose = () => {
        this.setState(prevState => ({
            show: false
        }))
    }
    handleShow = () => {
        this.setState({ show: true })
    };

    render() {
        //const  children = { name: this.state.children.name, value:this.state.children.value  }
        const { name, value } = this.state.children1;
        //const name = this.state.children1.name;
        //const value = this.state.children1.value;
        console.log('----------------------------------', this.state);

        //const { name, value } = this.state;
        const { errors } = this.state;
        
        return (
            <span>
                <Button className="btn btn-outline-success btn-sm float-right"
                    onClick={this.handleShow}
                    type="button"
                    variant="outline-success">
                    <i class="fa fa-address-card" />
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редагування відомостей</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={classnames('form-group', { 'has-error': !!errors.password })}>
                            <label htmlFor={name}>{name}</label>
                            <input type="text"
                                className="form-control"
                                id={name}
                                name={name}
                                value={value}
                                onChange={this.handleChange}
                                aria-describedby="passwordHelpBlock" />
                            <small id="passwordHelpBlock" class="form-text text-muted">Ваш пароль повинен містити 8-20 символів, великі та малі букви та цифри</small>
                            {!!errors.password ? <span className="text-muted help-block">{errors.password}</span> : ''}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </span>
        )
    }
}


export default ModalDialog