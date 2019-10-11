import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import classnames from 'classnames';

class ModalDialog extends React.Component {

    state = {
        show: false,
        type: this.props.children.type,
        name: this.props.children.name,
        value: this.props.children.value,
        descr: this.props.children.descr,
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

    handleSave = () => {
        this.setState(prevState => ({
            show: false,
        }))
        //console.log('---save---')
        this.props.getOut(this.state.name, this.state.value)
    }

    handleShow = () => {
        this.setState({ show: true })
    };

    render() {
        const { type, name, value, descr } = this.state;
        //console.log('----------------modal state---------------', this.state);
        const { errors } = this.state;
        let typedescr = false;
        if (type === "textarea")
            typedescr = true;
        
        return (
            <span>
                <Button className="btn btn-outline-success btn-sm float-right"
                    onClick={this.handleShow}
                    type="button"
                    variant="outline-success">
                    <i className="fa fa-address-card" />
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редагування відомостей</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={classnames('form-group', { 'has-error': !!errors.password })}>
                            <label htmlFor={name}>{name}</label>

                            {typedescr && <textarea type={type}
                                className="form-control"
                                id={name}
                                name={name}
                                value={value}
                                onChange={this.handleChange}
                                aria-describedby="passwordHelpBlock" />}

                            {!typedescr && <input type={type}
                                className="form-control"
                                id={name}
                                name={name}
                                value={value}
                                onChange={this.handleChange}
                                aria-describedby="passwordHelpBlock" />}

                            <small id="passwordHelpBlock" className="form-text text-muted">{descr}</small>
                            {!!errors.password ? <span className="text-muted help-block">{errors.password}</span> : ''}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>
                            Закрити
                        </Button>
                        <Button onClick={this.handleSave}>
                            Зберегти зміни
                        </Button>
                    </Modal.Footer>
                </Modal>
            </span>
        )
    }
}


export default ModalDialog