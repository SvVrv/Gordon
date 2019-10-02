﻿import { Component } from 'react';
import React from 'react'
import axios from 'axios';
import LotShort from './Lot-short'

class LotShortList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lots:[],
            category: this.props.category,
            userid:this.props.userid
          
        }
    };

    
    componentDidMount = () => {
        const url =!this.props.userid? 'api/torg/category/' + this.state.category : 'api/torg/' + this.state.userid;
        
        axios.get(url).then(res => {
            const lots = res.data;
            this.setState({
                 lots } );
            console.log("list", this.state)
        });
    }
    
    

    
        render() {
            const urlimg = "https://localhost:44365/images/"
            const list = this.state.lots.map((item) => {
                return <LotShort productName={item.productName} productImage={urlimg + item.productImage} productQuantity={item.productQuantity} finishDate={item.finishDate}
                    lastBet={item.lastBet} torgStatus={item.torgStatus} />
            });
            
            return (
                <div >
                    {list}
                </div>
            )

        

    }

}
export default LotShortList;