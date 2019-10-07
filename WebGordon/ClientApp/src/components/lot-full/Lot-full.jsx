import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import classnames from 'classnames';
import './Lot-full.css';
import ImageGallery from 'react-image-gallery';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import axios from 'axios';
class LotFull extends Component {
    constructor(props) {
        super(props);

        this.state = {
            torgId: this.props.torgId,
            lot: {

                id: null, productName: null, productQuantity: null, productDescription: null, torgStatus: null, productImages: [{ imgid: null, name:null,main:null}], lastBet: null, sellerId: null,
                sellerName: null, sellerImage: null, betsNumber: null, finishDate: null
            },
            //productName: "Продам дрова",
            //quantity: "10",
            //dimensions: "т",
            //currentPrice: "50",
            //betCount: "12",
            //remainingTime: "2 часа (16:30 22.10.2019)",
            //sellerImg: null,
            //sellerName: "Найкращий продавець",
            //torgDescript: "Просьба покупателям выходить на связь в течение 3-х дней с конкретными предложениями по выкупу лота.Лот должен быть выкуплен в течение пяти дней после договоренности о механизмах передачи лота и денег.Если в течение 5 суток не получу конкретных предложений или вы не ответили на мое письмо, то на шестой день лот перевыставляется и претензии по продаже лота не принимаю, вам ставлю отрицательный отзыв.",
            //torgDelivery: "<h5>Способы оплаты:</h5>< span > По договоренности</span> <br /><span>Банковский перевод</span><h5>Доставка:</h5>< p > Почта России по городу: <span>300 руб.</span> по стране: < span > 300 руб.</span> по миру: <span>300 руб.</span> <br />Комментарий: <i>заказное письмо </i></p >",
            productImages: [
            {
                original: 'https://picsum.photos/id/1018/1000/600/',
                thumbnail: 'https://picsum.photos/id/1018/250/150/',
            }
           
            ],
            yourPrice: null,
            errors: {}
        }
    }
    componentDidMount = () => {
        const url = 'api/Lot/' + this.state.torgId;

        axios.get(url).then(res => {
            const lot = res.data;
            this.setState({  lot });
            console.log("lot", this.state)
        });
    }

    handleChange = (e) => {
        //if (isNaN(String.fromCharCode(e.target.keyCode))) return;
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        if (e.target.value <= this.state.currentPrice) {
            let errors = { invalid: "Неправильно введено величину ставки!" };
            this.setState({ errors })
        }
        this.setState(
            { [e.target.name]: e.target.value })
        //this.setStateByErrors(e.target.name, e.target.value);
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
  


    render() {

        const errors = {};
        const isLoading = null;
        const urlimg = "https://localhost:44365/images/";
        let { id, productName, productQuantity, productDescription, torgStatus, productImages, lastBet, sellerId, sellerName, sellerImage, betsNumber, finishDate } = this.state.lot;


        this.state.productImages = productImages.map((item) => {
            return {
                original: urlimg+item.name,
                thumbnail: urlimg+item.name
            }

           
        });

        console.log(this.state.productImages  )
       
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
                            <ImageGallery items={this.state.productImages}
                              
                               />
                
                                              
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="border-bottom">
                                <h3 className="title" >{productName}</h3>
                                <span className="">Количество: {productQuantity}.</span>
                            </div>
                            <div className="">
                                <div className="row border-bottom" style={{ marginRight: "4px" }}>
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        Актуальна ціна:
                            </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        {lastBet} грн
                            </div >

                                </div >
                                <div className="row border-bottom" style={{ marginRight: "4px" }}>
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        Кількість ставок:
                            </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        {betsNumber}
                                    </div >
                                    <div className="">
                                        <form onSubmit={this.onSubmitForm}>
                                            <h2 style={{ textAlign: "center" }}></h2>

                                            {
                                                !!errors.invalid ?
                                                    <div className="alert alert-danger">
                                                        <strong>Помилка!</strong> {errors.invalid}.
                                        </div> : ''
                                            }

                                            <div className={classnames('form-group', { 'has-error': !!errors.name })}>

                                                {
                                                    !!errors.invalid ?
                                                        <div className="alert alert-danger">
                                                            <strong>Помилка!</strong> {errors.invalid}.
                    </div> : ''
                                                }

                                                <label htmlFor="yourPrice">Ваша ставка</label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="yourPrice"
                                                    name="yourPrice"
                                                    onChange={this.handleChange}
                                                    value={lastBet ? lastBet+1 : 1 + parseInt(lastBet)}
                                                />

                                                <div className="form-group">
                                                    <div className="">
                                                        <button type="submit"
                                                            className="btn btn-warning"
                                                            style={{ width: 100 + '%', marginTop: "3px" }}
                                                            disabled={isLoading}>Зробити ставку <i className="fa fa-check-circle" aria-hidden="true"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div >
                                    <div class="row">
                                        Завершение: {finishDate}
                                    </div >
                                    <div class="row">
                                        Продавець:
                                <img className="img-thumbnail" style={{ width: "40px" }} src={sellerImage ? sellerImage : "https://cdn.auth0.com/blog/react-js/react.png"} alt="Userimage" />
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
                                    <a className="nav-link active" id="descr-tab" data-toggle="tab" href="#descr" role="tab" aria-controls="descr" aria-selected="true">Описание</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="deliv-tab" data-toggle="tab" href="#deliv" role="tab" aria-controls="deliv" aria-selected="false">Оплата и доставка</a>
                                </li>

                            </ul>
                            <div className="tab-content " id="myTabContent">
                                <div className="tab-pane fade show active" id="descr" role="tabpanel" aria-labelledby="descr-tab">
                                    <h5>стандартное описание:</h5>
                                    <div>
                                        {productDescription}
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="deliv" role="tabpanel" aria-labelledby="deliv-tab">
                                    <div>
                                        <h5>Тип сделки:</h5>
                                        <p>Предоплата</p>
                                    </div>
                                    {productDescription}
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