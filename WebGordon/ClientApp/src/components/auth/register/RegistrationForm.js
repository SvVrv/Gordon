import React, { Component } from 'react';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import { register } from '../../../actions/authActions'


class RegistrationForm extends Component {
    state = { 
        name: '',
        telnumber:'',
        email:'',
        password:'',
        errors: {},
        isLoading: false,
        done: false
    }

    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors=Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    [name]: value,
                    errors
                }
            )
        }
        else {
            this.setState(
            {[name]: value})
        }
    }

    handleChange= (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let errors={};
        if(this.state.name==='') errors.name = "Поле є обов'язковим!"
        if (this.state.email === '') errors.email = "Поле є обов'язковим!"
        if (this.state.telnumber === '') errors.telnumber = "Поле є обов'язковим!"
        if (this.state.password === '') errors.password = "Поле є обов'язковим!"

        const isValid = Object.keys(errors).length ===0
        if (isValid) {
            const {name, email, telnumber, password} = this.state;
            this.setState({isLoading: true});
            console.log('---SEND DATA state----', { Name: name, Telnumber: telnumber, Password: password });
            register({Name: name, Telnumber: telnumber, Email: email, Password: password })
            .then(
                ()=> this.setState({done: true}),
                (err) => this.setState({errors: err.response.data, isLoading: false})
            );
        }
        else {
            this.setState({errors});
        }
    }

    render() {
        const { errors , isLoading } = this.state;
        console.log('---FormRegister state----', this.state);
        const form = (
            <form onSubmit={this.onSubmitForm}>
                <h2>Реєстрація користувача</h2>

                {
                    !!errors.invalid ?
                    <div className="alert alert-danger">
                        <strong>Помилка!</strong> {errors.invalid}.
                    </div>: ''
                }

                 <div className="{classnames('form-group', {'has-error': !!errors.name})}">
                    <label htmlFor="name">Ім'я</label>
                    <input type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}/>
                    {!!errors.name ? <span className="help-block">{errors.name}</span>: ''}
                 </div>

                <div className="{classnames('form-group', {'has-error': !!errors.telnumber})}">
                    <label htmlFor="telnumber">Номер телефону</label>
                    <input type="text"
                        className="form-control"
                        id="telnumber"
                        name="telnumber"
                        value={this.state.telnumber}
                        onChange={this.handleChange}/>
                    {!!errors.telnumber ? <span className="help-block">{errors.telnumber}</span>: ''}
                 </div>  

                 <div className="{classnames('form-group', {'has-error': !!errors.email})}">
                    <label htmlFor="email">Електронна пошта</label>
                    <input type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}/>
                    {!!errors.email ? <span className="help-block">{errors.email}</span>: ''}
                 </div>    

                 <div className="{classnames('form-group', {'has-error': !!errors.password})}">
                    <label htmlFor="password">Пароль</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}/>
                    {!!errors.password ? <span className="help-block">{errors.password}</span>: ''}
                 </div>  

                <div className="form-group">
                    <div className="">
                        <button type="submit" 
                                className="btn btn-warning"
                                disabled={isLoading}>Зареєструватися<span className="glyphicon glyphicon-saved"></span></button>
                    </div>
                </div>                               




            </form>
        )
        
        
        
        return (
            this.state.done? <Redirect to="/"/> : form
        );
    }
}

export default RegistrationForm;