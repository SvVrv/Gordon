
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
           
        });
    }
    
    

    
        render() {
            const urlimg = "https://localhost:44365/images/"

            const list = this.state.lots.map((item) => {
                return <LotShort torgId={item.id} productName={item.productName} productImage={urlimg + item.productImage} productQuantity={item.productQuantity} dimensions={item.dimensions} finishDate={item.finishDate}
                    lastBet={item.lastBet} torgStatus={item.torgStatus} key={item.id} seller={item.seller} />
            });
            
            return (
                <div >
                    {list}
                </div>
            )

        

    }

}
export default LotShortList;