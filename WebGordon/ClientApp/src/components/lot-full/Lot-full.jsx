import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import './Lot-full.css';
import ImageGallery from 'react-image-gallery';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import defUserImage from '../users/no-user-image-square.jpg'
import { connect } from 'react-redux';
import { Redirect } from "react-router";

class LotFull extends Component {
    constructor(props) {
        super(props);

        this.state = {
            torgId: this.props.torgId,
            lot: {

                id: null, productName: null, productQuantity: null, dimensions: null, productDescription: null, torgStatus: null, delivery: null, productImages: [{ imgid: null, name: null, main: null }], lastBet: null, sellerId: null,
                sellerName: null, sellerImage: null, betsNumber: null, finishDate: null
            },
       
            productImages: [
            {
                original: 'https://picsum.photos/id/1018/1000/600/',
                thumbnail: 'https://picsum.photos/id/1018/250/150/',
            }
           
            ],
            yourPrice: null,
            errors: {},
            disabled: false,
            done:false
        }
    }
    componentDidMount = () => {
        const url = 'api/Lot/' + this.state.torgId;
        axios.get(url).then(res => {
            const lot = res.data;
            this.setState({ lot });
            console.log("lot", this.state)
        });
        this.interval = setInterval(() => {
            axios.get(url).then(res => {
                const lot = res.data;
                this.setState({ lot });
                console.log("lot", this.state)
            });}, 30000)
    }

    componentWillUnmount = () => {
        clearInterval(this.interval)
    }

    onSubmitForm = (e) => {
        
        e.preventDefault();
      
        const torgId = this.state.torgId;
        const bet = this.state.yourPrice;
        const sellerId = this.props.auth.user.id;
        const startDate = Date.now();

        axios.post("api/TorgBets", { TorgId: torgId, ClientId: sellerId, Bet: bet , StartDate: startDate })
                .then(
                    () => this.setState({ done: true }),
                    (err) => this.setState({ errors: err.response.data, isLoading: false })
                );
    }

       
    

    handleChange = (e) => {
        //if (isNaN(String.fromCharCode(e.target.keyCode))) return;
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        if (parseInt(e.target.value, 10) <= parseInt(this.state.lot.lastBet, 10)) {
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
        console.log("render", this.state)
        const errors = {};
        const isLoading = null;
        const urlimg = "https://localhost:44365/images/";
        let { id, productName, productQuantity, dimensions, productDescription, torgStatus,delivery, productImages, lastBet, sellerId, sellerName, sellerImage, betsNumber, finishDate } = this.state.lot;


        this.state.productImages = productImages.map((item) => {
            return {
                original: urlimg + item.name,
                thumbnail: urlimg + item.name
            }
        });
       
        const rf = <React.Fragment>
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
                        <ImageGallery items={this.state.productImages} />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6">
                    <div className="border-bottom">
                        <h3 className="title" >{productName}</h3>
                        <span className="">Кількість: {productQuantity} {dimensions}.</span>
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
                                                value={this.state.yourPrice ? this.state.yourPrice : 1 + lastBet}
                                            />
                                        </div>

                                        <button type="submit"
                                            className="btn btn-warning"
                                            style={{ width: 100 + '%' }}
                                            disabled={this.state.disabled}>Зробити ставку <i className="fa fa-check-circle" aria-hidden="true"></i>
                                        </button>

                                    </div>
                                </form>
                            </div >
                            <div >
                                Закінчення: {finishDate}
                            </div >
                            <div >
                                Продавець:
                                <img className="img-thumbnail" style={{ width: "40px" }} src={sellerImage ? urlimg + sellerImage : defUserImage} alt="Userimage" />
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
                                {productDescription}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="deliv" role="tabpanel" aria-labelledby="deliv-tab">
                            {delivery}
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
            return (
                
            this.state.done ?
                <Redirect to="/" /> :
                rf
        );
                
            
        }
     
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps)(LotFull);
                           // <img className="img-thumbnail border-0" src="https://cdn.auth0.com/blog/react-js/react.png" alt="lot" />