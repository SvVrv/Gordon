import classnames from 'classnames';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import ImgList from './ImgList';
import axios from 'axios';
import { connect } from 'react-redux';


class ProductForm extends Component {
    
    state = {

        id: this.props.id ? this.props.id : 0,
        category: '',
        productName: this.props.productName ? this.props.productName : '',
        quantity: this.props.quantity ? this.props.quantity: '',
        dimensions: this.props.dimensions ? this.props.dimensions : '',
        startPrice: this.props.startPrice ? this.props.startPrice : '',
        torgTime: this.props.torgTime ? this.props.torgTime : '',
        description: this.props.description ? this.props.description : '',
        torgDelivery: this.props.torgDelivery ? this.props.torgDelivery : '',
        images: this.props.images ? this.props.images : [],
        errors: {},
        isLoading: false,
        done: false,
        disabled: false,
        listOptions: []
    }

    baseId = 100;

    componentDidMount = () => {
        axios.get('api/Categories').then(res => {
            const categorys = res.data;
            const listOptions = categorys.map((item) => {
                return <option value={item.name} key={item.name} > {item.name}</option>
            });
            this.setState({ listOptions });

        });
    }

    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }

    handleDigitChange = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        this.setStateByErrors(e.target.name, e.target.value);
    }

    handleImageChange2 = (evt) => {
        const { files } = evt.target;
        if (files && files[0]) {
            if (files[0].type.match(/^image\//)) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    const newImage = {
                        id: this.baseId++,
                        main: false,
                        image: e.target.result
                    }
                    this.setState((prevstate) => {
                        const newImages = [...this.state.images, newImage];
                        return ({ images: newImages })
                    });
                }
                reader.readAsDataURL(files[0]);
            }
            else alert('Обраний файл не є зображенням. Спробуйте ще раз')
        }
    }

    deleteImg = (id) => {
        this.setState(({ images }) => {
            const idx = images.findIndex((el) => el.id === id);
            let newImages = [...images.slice(0, idx), ...images.slice(idx + 1)];
            return { images: newImages };
        })
    }

    checkMainImg = (id) => {
        this.setState(({ images }) => {
            const idx = images.findIndex((el) => el.id === id);
            const oldItem = images[idx];
            const newItem = { ...oldItem, main: true }
            let newImages = [...images.slice(0, idx), ...images.slice(idx + 1)];
            newImages.forEach((item, i, arr) => { item.main = false });
            newImages.push(newItem);
            newImages.sort((a, b) => {return (a.id - b.id) });
            return { images: newImages };
        })
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

    onSaveForm = (e) => {
        e.preventDefault();
        let errors = {};
        if (this.state.category === 'Виберіть...' || this.state.category === '') errors.category = "Поле є обов'язковим!";
        if (this.state.productName === '') errors.productName = "Поле є обов'язковим!";
        if (this.state.quantity === '') errors.quantity = "Поле є обов'язковим!"
        if (this.state.dimensions === 'Виберіть...' || this.state.dimensions === '') errors.dimensions = "Поле є обов'язковим!"
        if (this.state.startPrice === '') errors.startPrice = "Поле є обов'язковим!"
        if (this.state.torgTime === '') errors.torgTime = "Поле є обов'язковим!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const  sellerId = this.props.auth.user.id;
            const {id, category, productName, quantity, dimensions, startPrice, torgTime, description, torgDelivery, images } = this.state;
            this.setState({ isLoading: true });
            const data = {
                Id: id,
                SellerId: sellerId,
                Category: category,
                ProductName: productName,
                Quantity: quantity,
                Dimensions: dimensions,
                StartPrice: startPrice,
                TorgTime: torgTime,
                Description: description,
                TorgDelivery: torgDelivery,
                Images: images
            }
            return axios.post('api/Lot/add', data)
                .then(data => {alert("Ваш лот успішно збережено ", data.id)})
                .then(
                    () => this.setState({ done: true }),
                    (err) => {
                    alert("Сталася помилка. Ваш лот не збережено, спробуйте ще раз");
                    this.setState({ errors: err.response.data, isLoading: false })
                }
                );
        }
        else {
            this.setState({ errors });
        }
    }

    onSaveAndStartForm = (e) => {
        e.preventDefault();
        let errors = {};
        if (this.state.category === 'Виберіть...' || this.state.category === '') errors.category = "Поле є обов'язковим!";
        if (this.state.productName === '') errors.productName = "Поле є обов'язковим!";
        if (this.state.quantity === '') errors.quantity = "Поле є обов'язковим!"
        if (this.state.dimensions === 'Виберіть...' || this.state.dimensions === '') errors.dimensions = "Поле є обов'язковим!"
        if (this.state.startPrice === '') errors.startPrice = "Поле є обов'язковим!"
        if (this.state.torgTime === '') errors.torgTime = "Поле є обов'язковим!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const sellerId = this.props.auth.user.id;
            const { id, category, productName, quantity, dimensions, startPrice, torgTime, description, torgDelivery, images } = this.state;
            this.setState({ isLoading: true });
            const data = {
                Id: id,
                SellerId: sellerId,
                Category: category,
                ProductName: productName,
                Quantity: quantity,
                Dimensions: dimensions,
                StartPrice: startPrice,
                TorgTime: torgTime,
                Description: description,
                TorgDelivery: torgDelivery,
                Images: images
            }
            return axios.post('api/Lot/start', data)
                .then(res => { })
                .then(
                    //() => this.setState({ done: true }),
                    (data) => {
                        alert("Ваш лот успішно стартував ", data)
                        this.setState({ done: true })
                    },
                    (err) => {
                        alert("Сталася помилка. Ваш лот не стартував, спробуйте ще раз");
                        this.setState({ errors: err.response.data, isLoading: false })
                    }
                );
        }
        else {
            this.setState({ errors });
        }
    }



    render() {
        const { errors } = this.state;
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
                    <label htmlFor="category">Категорія товару</label>
                    <select type="text"
                        className={classnames('form-control', { 'is-invalid': !!errors.category })}
                        id="category"
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange} >
                        <option selected>Виберіть...</option>
                        {this.state.listOptions}
                    </select>
                    {!!errors.category ? <span className="text-muted help-block">{errors.category}</span> : ''}
                </div>

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

                <div className="form-row">
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
                    <div className='form-group col-md-4'>
                        <label htmlFor="dimensions">Одиниці виміру</label>
                        <select name="dimensions" onChange={this.handleChange} id="dimensions" className={classnames('form-control', { 'is-invalid': !!errors.dimensions })}>
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
                    <small id="startPriceHelpBlock" className="form-text text-muted">Ціна, з якої будуть починатися торги</small>
                    {!!errors.startPrice ? <span className="text-muted help-block">{errors.startPrice}</span> : ''}
                </div>

                <div className="form-group">
                    <label htmlFor="torgTime">Час проведення аукціону</label>
                    <select name="torgTime" id="torgTime" onChange={this.handleChange} className={classnames('form-control', { 'is-invalid': !!errors.torgTime })}>
                        <option selected>Виберіть...</option>
                        <option>3 дні</option>
                        <option>1 тиждень</option>
                        <option>2 тижні</option>
                        <option>3 тижні</option>
                    </select>
                    <small id="torgTimeHelpBlock" className="form-text text-muted">Бажаний час проведення торгів</small>
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
                    <small id="descriptionHelpBlock" className="form-text text-muted">Введіть детальний опис Вашого товару, на який будуть орієнтуватися покупці</small>
                </div>

                <div className='form-group'>
                    <label htmlFor="torgDelivery">Доставка і оплата</label>
                    <textarea
                        className="form-control"
                        id="torgDelivery"
                        name="torgDelivery"
                        value={this.state.torgDelivery}
                        onChange={this.handleChange} />
                    <small id="torgDeliveryHelpBlock" className="form-text text-muted">Конкретизуйте умови доставки та оплати за товар</small>
                </div>


                <div className="form-group">
                    <label htmlFor="userImage">Фото товару</label>
                    <input type="file"
                        className="form-control-file"
                        id="image"
                        name="image"
                        onChange={this.handleImageChange2} />
                </div>

                <div className="row" style={{ marginLeft: "15px" }}>
                    <ImgList images={this.state.images} deleteImg={this.deleteImg} checkMainImg={this.checkMainImg} />
                </div>

                <div className="">

                    <button onClick={this.onSaveForm}
                        className="btn btn-warning "
                        style={{ width: 47 + '%', margin: "5px" }}
                        disabled={isLoading}>Зберегти <i className="fa fa-check-circle" aria-hidden="true"></i></button>


                    <button onClick={this.onSaveAndStartForm}
                            className="btn btn-warning "
                            style={{ width: 47 + '%', margin: "5px" }}
                            disabled={isLoading}>Почати торги <i className="fa fa-check-circle" aria-hidden="true"></i></button>

                    </div>                               

            </form>
         )
               
               



                return (
            this.state.done? <Redirect to="/profile" /> : form
            );
        }
    }
    

        
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps)(ProductForm);       
//export default ProductForm;
//export default connect(null, {register})(RegistrationForm);
                //<div className="row">
                //    <ImgItem id="1" main="false" image={this.state.images[0].image} />
                //    <ImgItem id="2" main="false" image={this.state.images[0].image} />
                //</div>