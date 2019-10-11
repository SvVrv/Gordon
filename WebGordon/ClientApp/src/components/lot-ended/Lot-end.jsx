import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
//import './Lot-full.css';
import ImageGallery from 'react-image-gallery';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import defUserImage from '../users/no-user-image-square.jpg'
import { connect } from 'react-redux';
import { Redirect } from "react-router";

class LotEnd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            torgId: this.props.torgId,
            lot: {

                id: null, productName: null, productQuantity: null, dimensions: null, productDescription: null, delivery: null,
                productImages: [{ imgid: null, name: null, main: null }], lastBet: null, sellerId: null,
                sellerName: null, sellerImage: null, sellerPhone: null, sellerMail: null, buyerId: null, buyerName: null,
                buyerPhone: null,buyerMail:null,betsNumber: null, finishDate: null
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
        const url = 'api/Lot/end/' + this.state.torgId;
        axios.get(url).then(res => {
            const lot = res.data;
            this.setState({ lot });
            console.log("lot", this.state)
        });

    }

    

       
    

    



    render() {
        
        const errors = {};
        const isLoading = null;
        const urlimg = "https://localhost:44365/images/";
        let { id, productName, productQuantity, dimensions, productDescription, delivery, productImages, lastBet, sellerId, sellerName, sellerImage, betsNumber, finishDate } = this.state.lot;
        finishDate = new Date(finishDate).toLocaleString('uk-UA');

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
                <Redirect to="/profile" /> :
                rf
        );
                
            
        }
     
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps)(LotEnd);
                           // <img className="img-thumbnail border-0" src="https://cdn.auth0.com/blog/react-js/react.png" alt="lot" />