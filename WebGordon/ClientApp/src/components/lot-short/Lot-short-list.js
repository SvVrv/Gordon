import React from 'react';
import axios from 'axios';
import LotShort from './Lot-short'

class LotShortList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lots:[],
          category:this.props.category
        }
    };

    
    componentDidMount = () => {
        const url = 'api/torg/category/' + this.state.category;
        axios.get(url).then(res => {
            const lots = res.data;
            this.setState({ lots });
            console.log(this.state)
        });
    }



    
        render() {
            const urlimg = "https://localhost:44365/images/"
            const list = this.state.lots.map((item) => {
                return <LotShort productName={item.productName} productImage={urlimg + item.productImage} productQuantity={item.productQuantity} finishDate={item.finishDate}
                    lastBet={item.lattBet} torgStatus={item.torgStatus} /> 
            });
            
            return (
                <div className="row">
                    {list}
                </div>
            )

        

    }

}
export default LotShortList;