import React, { Component } from 'react';
import classnames from 'classnames';
import { Redirect } from 'react-router';
//import { register } from '../../actions/authActions'
//import { connect } from "react-redux";
import PropTypes from 'prop-types';

import ImgItem from './ImgItem'

class ProductForm extends Component {
    state = {
        productName: '',
        quantity: '',
        dimensions: '',
        startPrice: '',
        torgTime: '',
        description: '',
        torgDelivery: '',
        images: [],
        errors: {},
        isLoading: false,
        done: false,
        disabled: false,

        image: ''
    }

    handleChange = (e) => {

        this.setStateByErrors(e.target.name, e.target.value);
    }

    handleDigitChange = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
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

    handleImageChange2 = (evt) => {
        const { name, files } = evt.target;
        if (files && files[0]) {
            if (files[0].type.match(/^image\//)) {
                let reader = new FileReader();
                reader.onload = (e) => {

                    const newImage={
                        id: this.state.images.count,
                        main: false,
                        image: e.target.result
                    }
                    this.setState((prevstate) => {
                        const newImages = [...this.state.images, newImage];
                        return ({ images: newImages })
                    });
                    //this.setStateByErrors(name, e.target.result);
                }
                reader.readAsDataURL(files[0]);
            }
            else alert('Обраний файл не є зображенням. Спробуйте ще раз')
        }
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

    onSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        if (this.state.productName === '') errors.productName = "Поле є обов'язковим!";
        if (this.state.quantity === '') errors.quantity = "Поле є обов'язковим!"
        if (this.state.dimensions === 'Виберіть...' || this.state.dimensions === '') errors.dimensions = "Поле є обов'язковим!"
        if (this.state.startPrice === '') errors.startPrice = "Поле є обов'язковим!"
        if (this.state.torgTime === '') errors.torgTime = "Поле є обов'язковим!"


        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { name, email, telnumber, password, description, image } = this.state;
            this.setState({ isLoading: true });
            console.log('---SEND DATA state----', { Name: name, Telnumber: telnumber, Password: password, Description: description, Image: image });
        //    this.props.register({ Name: name, Telnumber: telnumber, Email: email, Password: password, Description: description, Image: image })
        //        .then(
        //            () => this.setState({ done: true }),
        //            (err) => this.setState({ errors: err.response.data, isLoading: false })
        //        );
        }
        else {
            this.setState({ errors });
        }
    }



    render() {
        const { errors } = this.state;
        const image = this.state.image;
        const isLoading = false;
        console.log("---render form--", this.state)


        const form = (
            <form onSubmit={this.onSubmitForm}>
                <h2 style={{ textAlign: "center" }}>Додати новий лот</h2>

                {
                    !!errors.invalid ?
                        <div className="alert alert-danger">
                            <strong>Помилка!</strong> {errors.invalid}.
                        </div> : ''
                }

                <div className='form-group'>
                    <label htmlFor="productName">Назва товару</label>
                    <input type="text"
                        className={classnames('form-control', { 'is-invalid': !!errors.productName })}
                        id="productName"
                        name="productName"
                        value={this.state.productName}
                        onChange={this.handleChange} />
                    {!!errors.productName ? <span className="text-muted help-block">{errors.productName}</span> : ''}
                </div>

                <div class="form-row">
                    <div className='form-group col-md-8'>
                        <label htmlFor="quantity">Кількіть товару для продажу</label>
                        <input type="text"
                            className={classnames('form-control', { 'is-invalid': !!errors.quantity })}
                            id="quantity"
                            name="quantity"
                            value={this.state.quantity}
                            onChange={this.handleDigitChange} />
                        {!!errors.quantity ? <span className="text-muted help-block">{errors.quantity}</span> : ''}
                    </div>
                    <div class='form-group col-md-4'>
                        <label for="dimensions">Одиниці виміру</label>
                        <select name="dimensions" onChange={this.handleChange} id="dimensions" class={classnames('form-control', { 'is-invalid': !!errors.dimensions })}>
                            <option selected>{this.state.dimensions}</option>
                            <option>шт.</option>
                            <option>м.куб.</option>
                            <option>т.</option>
                            <option>кг.</option>
                         </select>
                        {!!errors.dimensions ? <span className="text-muted help-block">{errors.dimensions}</span> : ''}
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor="startPrice">Стартова ціна, грн</label>
                    <input type="text"
                        className={classnames('form-control', { 'is-invalid': !!errors.startPrice })}
                        id="startPrice"
                        name="startPrice"
                        value={this.state.startPrice}
                        onChange={this.handleDigitChange} />
                    <small id="startPriceHelpBlock" class="form-text text-muted">Ціна, з якої будуть починатися торги</small>
                    {!!errors.startPrice ? <span className="text-muted help-block">{errors.startPrice}</span> : ''}
                </div>

                <div class="form-group">
                    <label for="torgTime">Час проведення аукціону</label>
                    <select id="torgTime" onChange={this.handleChange} class={classnames('form-control', { 'is-invalid': !!errors.torgTime })}>
                        <option selected>Виберіть...</option>
                        <option>3 дні</option>
                        <option>1 тиждень</option>
                        <option>2 тижні</option>
                        <option>3 тижні</option>
                    </select>
                    <small id="torgTimeHelpBlock" class="form-text text-muted">Бажаний час проведення торгів</small>
                    {!!errors.torgTime ? <span className="text-muted help-block">{errors.torgTime}</span> : ''}
                </div>

                <div className='form-group'>
                    <label htmlFor="description">Опис товару</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange} />
                    <small id="descriptionHelpBlock" class="form-text text-muted">Введіть детальний опис Вашого товару, на який будуть орієнтуватися покупці</small>
                </div>

                <div className='form-group'>
                    <label htmlFor="torgDelivery">Доставка і оплата</label>
                    <textarea
                        className="form-control"
                        id="torgDelivery"
                        name="torgDelivery"
                        value={this.state.torgDelivery}
                        onChange={this.handleChange} />
                    <small id="torgDeliveryHelpBlock" class="form-text text-muted">Конкретизуйте умови доставки та оплати за товар</small>
                </div>



                <div className="row">
                <ImgItem id="1" main="false" image={image}/>
                <ImgItem id="2" main="false" image={image} />
                </div>



               

                <div class="form-group">
                    <label htmlFor="userImage">Фото товару</label>
                    <input type="file"
                        className="form-control-file"
                        id="image"
                        name="image"
                        onChange={this.handleImageChange2} />
                </div>

                {
                    image != '' &&
                    <div className="card" style={{ width: 18 + 'rem',  textAlign: "center" }}>
                        <img className="card-img-top" src={image} alt="Card cap"/>
                    </div>
                }

                <div className="">

                            <button type="submit"
                            className="btn btn-warning "
                            style={{ width: 47+'%', margin: "5px" }}
                            disabled={isLoading}>Зберегти <i className="fa fa-check-circle" aria-hidden="true"></i></button>


                        <button type="submit"
                            className="btn btn-warning "
                        style={{ width: 47 + '%', margin: "5px" }}
                            disabled={isLoading}>Почати торги <i className="fa fa-check-circle" aria-hidden="true"></i></button>

                    </div>                               

            </form>
         )
               
               



                return (
            this.state.done? <Redirect to="/" /> : form
            );
        }
    }
    

        
        
export default ProductForm;
//export default connect(null, {register})(RegistrationForm);