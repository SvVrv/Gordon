﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './Lot-full.css';
import ImageGallery from 'react-image-gallery';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import defUserImage from '../users/no-user-image-square.jpg'

class LotFull extends Component {
    
    state = {
        torgId: "2",
        productName: "Продам дрова",
        quantity: "10",
        dimensions: "т",
        currentPrice: "50",
        betCount: "12",
        remainingTime: "2 часа (16:30 22.10.2019)",
        sellerImg: null,
        sellerName: "Найкращий продавець",
        torgDescript: "Просьба покупателям выходить на связь в течение 3-х дней с конкретными предложениями по выкупу лота.Лот должен быть выкуплен в течение пяти дней после договоренности о механизмах передачи лота и денег.Если в течение 5 суток не получу конкретных предложений или вы не ответили на мое письмо, то на шестой день лот перевыставляется и претензии по продаже лота не принимаю, вам ставлю отрицательный отзыв.",
        torgDelivery: "<h5>Способы оплаты:</h5>< span > По договоренности</span> <br /><span>Банковский перевод</span><h5>Доставка:</h5>< p > Почта России по городу: <span>300 руб.</span> по стране: < span > 300 руб.</span> по миру: <span>300 руб.</span> <br />Комментарий: <i>заказное письмо </i></p >",
        productImages: [
            {
                original: 'https://picsum.photos/id/1018/1000/600/',
                thumbnail: 'https://picsum.photos/id/1018/250/150/',
            },
            {
                original: 'https://picsum.photos/id/1015/1000/600/',
                thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
            {
                original: 'https://picsum.photos/id/1019/1000/600/',
                thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
        ],
        yourPrice: null,
        errors: {},
        disabled: false
    }

    componentDidMount = () => {
        //get data from axios
        this.interval = setInterval(this.getdatafromAxios, 30000)
    }

    componentWillUnmount = () => {
        clearInterval(this.interval)
    }

    handleChange = (e) => {
        //if (isNaN(String.fromCharCode(e.target.keyCode))) return;
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        if (parseInt(e.target.value, 10) <= parseInt(this.state.currentPrice, 10)) {
            let errors = { invalid: "Помилкова ставка!" };
            this.setState({ errors, disabled: true })
        }
        else
            this.setState({
                errors: {},
                disabled: false
            });
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        const { productName, quantity, dimensions, currentPrice, betCount, remainingTime, sellerImg, sellerName, torgDescript, torgDelivery, productImages, yourPrice } = this.state;

        console.log("--render--", this.state)

        return (
            <React.Fragment>
                <div className="row content border rounded-lg" >
                    <div className="col-sm-12">
                        <div className="col-sm-12" style={{ borderBottom: "1px solid #dfdfdf" }}>
                            <div className="col-sm-7 xs_center_left_upwards">
                                <h3 className="title" >{productName}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-6">
                        <div className="border" >
                            <ImageGallery items={productImages} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6">
                        <div className="border-bottom">
                            <h3 className="title" >{productName}</h3>
                            <span className="">Кількість: {quantity} {dimensions}.</span>
                        </div>
                        <div className="">
                            <div className="row border-bottom" style={{ marginRight: "4px" }}>
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    Актуальна ціна:
                            </div>
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    {currentPrice} грн
                            </div >

                            </div >
                            <div className="row border-bottom" style={{ marginRight: "4px" }}>
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    Кількість ставок:
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    {betCount}
                                </div >
                                <div style={{ width: "100%" }}>
                                    <form onSubmit={this.onSubmitForm}>
                                        <div className="form-group">

                                            {
                                                !!this.state.errors.invalid ?
                                                    <div className="alert alert-danger">
                                                        <strong>Помилка!</strong> {this.state.errors.invalid}
                                                    </div> : ''
                                            }

                                            <div className='form-group'>
                                                <label htmlFor="yourPrice">Ваша ставка:</label>
                                                <input type="text"
                                                    className={classnames('form-control', { 'is-invalid': !!this.state.errors.invalid })}
                                                    id="yourPrice"
                                                    name="yourPrice"
                                                    onChange={this.handleChange}
                                                    value={yourPrice ? yourPrice : 1 + parseInt(currentPrice, 10)}
                                                />
                                            </div>

                                            <button type="submit"
                                                className="btn btn-warning"
                                                style={{ width: 100 + '%'}}
                                                disabled={this.state.disabled}>Зробити ставку <i className="fa fa-check-circle" aria-hidden="true"></i>
                                            </button>

                                        </div>
                                    </form>
                                </div >
                                <div className="row">
                                    Закінчення: {remainingTime}
                                </div >
                                <div className="row">
                                    Продавець:
                                <img className="img-thumbnail" style={{ width: "40px" }} src={sellerImg ? sellerImg : defUserImage} alt="Userimage" />
                                    {sellerName}
                                </div >
                            </div >
                        </div>
                    </div >
                </div >

                <div className="row content border rounded-lg" >
                    <div>
                        <ul className="nav nav-tabs " id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="descr-tab" data-toggle="tab" href="#descr" role="tab" aria-controls="descr" aria-selected="true">Опис</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="deliv-tab" data-toggle="tab" href="#deliv" role="tab" aria-controls="deliv" aria-selected="false">Оплата і доставка</a>
                            </li>
                        </ul>
                        <div className="tab-content " id="myTabContent">
                            <div className="tab-pane fade show active" id="descr" role="tabpanel" aria-labelledby="descr-tab">
                                <h6>Опис товару:</h6>
                                <div>
                                    {torgDescript}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="deliv" role="tabpanel" aria-labelledby="deliv-tab">
                                {torgDelivery}
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default LotFull
                           // <img className="img-thumbnail border-0" src="https://cdn.auth0.com/blog/react-js/react.png" alt="lot" />