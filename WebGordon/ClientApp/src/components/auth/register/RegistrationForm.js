import React, { Component } from 'react';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import { register } from '../../../actions/authActions'
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class RegistrationForm extends Component {
    state = {
        name: '',
        telnumber: '',
        email: '',
        password: '',
        description: '',
        image: '',
        errors: {},
        isLoading: false,
        done: false
    }

    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    [name]: value,
                    errors
                })
        }
        else {
            this.setState(
                { [name]: value })
        }
    }

    handleChange = (e) => {

        this.setStateByErrors(e.target.name, e.target.value);
    }

    handleImageChange = (evt) => {
        const { name, files } = evt.target;
        if (files && files[0]) {
            if (files[0].type.match(/^image\//)) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.setStateByErrors(name, e.target.result);
                }
                reader.readAsDataURL(files[0]);
            }
            else alert('Обраний файл не є зображенням. Спробуйте ще раз')
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        if (this.state.name === '') errors.name = "Поле є обов'язковим!"
        if (this.state.email === '') errors.email = "Поле є обов'язковим!"
        if (this.state.telnumber === '') errors.telnumber = "Поле є обов'язковим!"
        if (this.state.password === '') errors.password = "Поле є обов'язковим!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { name, email, telnumber, password, description, image } = this.state;
            this.setState({ isLoading: true });
            console.log('---SEND DATA state----', { Name: name, Telnumber: telnumber, Password: password, Description: description, Image: image });
            this.props.register({ Name: name, Telnumber: telnumber, Email: email, Password: password, Description: description, Image: image })
                .then(
                    () => this.setState({ done: true }),
                    (err) => this.setState({ errors: err.response.data, isLoading: false })
                );
        }
        else {
            this.setState({ errors });
        }
    }



    render() {
        const { errors, isLoading, image } = this.state;
        console.log('---FormRegister state----', this.state);
        const form = (
            <form onSubmit={this.onSubmitForm}>
                <h2 style={{ textAlign: "center" }}>Реєстрація користувача</h2>

                {
                    !!errors.invalid ?
                        <div className="alert alert-danger">
                            <strong>Помилка!</strong> {errors.invalid}.
                    </div> : ''
                }

                <div className={classnames('form-group', { 'has-error': !!errors.name })}>

                    <label htmlFor="name">Ім'я</label>
                    <input type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange} />
                    {!!errors.name ? <span className="text-muted help-block">{errors.name}</span> : ''}
                </div>

                <div className={classnames('form-group', { 'has-error': !!errors.telnumber })}>
                    <label htmlFor="telnumber">Номер телефону</label>
                    <input type="text"
                        className="form-control"
                        id="telnumber"
                        name="telnumber"
                        value={this.state.telnumber}
                        onChange={this.handleChange} />
                    {!!errors.telnumber ? <span className="text-muted help-block">{errors.telnumber}</span> : ''}
                </div>

                <div className={classnames('form-group', { 'has-error': !!errors.email })}>
                    <label htmlFor="email">Електронна пошта</label>
                    <input type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        aria-describedby="emailHelpBlock" />
                    <small id="emailHelpBlock" class="form-text text-muted">Діюча адреса, на яку будуть приходити важливі повідомлення</small>
                    {!!errors.email ? <span className="text-muted help-block">{errors.email}</span> : ''}
                </div>

                <div className={classnames('form-group', { 'has-error': !!errors.password })}>
                    <label htmlFor="password">Пароль</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        aria-describedby="passwordHelpBlock" />
                    <small id="passwordHelpBlock" class="form-text text-muted">Ваш пароль повинен містити 8-20 символів, великі та малі букви та цифри</small>
                    {!!errors.password ? <span className="text-muted help-block">{errors.password}</span> : ''}
                </div>

                <div className='form-group'>
                    <label htmlFor="description">Додаткова інформація</label>
                    <textarea 
                        className="form-control"
                        id="description"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange} />
                </div>

                <div class="form-group">
                    <label htmlFor="userImage">Фото користувача</label>
                    <input type="file"
                        className="form-control-file"
                        id="image"
                        name="image"
                        //value={this.state.image}
                        onChange={this.handleImageChange} />
                </div>

                {
                    image !== '' &&
                    <div className="card" style={{ width: 18 + 'rem',  textAlign: "center" }}>
                        <img className="card-img-top" src={image} alt="Card cap"/>
                    </div>
                }

                    <div className="form-group">
                        <div className="">
                            <button type="submit"
                            className="btn btn-warning"
                            style={{ width: 100+'%' }}
                            disabled={isLoading}>Зареєструватися <i className="fa fa-check-circle" aria-hidden="true"></i></button>
                        </div>
                    </div>                               




            </form>
                )
               
               
               
                return (
            this.state.done? <Redirect to="/" /> : form
            );
        }
    }
    
    RegistrationForm.propTypes =
    {
                    register: PropTypes.func.isRequired
            }
        
        
        //export default RegistrationForm;
export default connect(null, {register})(RegistrationForm);