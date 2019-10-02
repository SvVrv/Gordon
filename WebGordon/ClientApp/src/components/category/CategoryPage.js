import React from 'react';
import LotShortList from '../lot-short/Lot-short-list'


class CategoryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
           
        }
    };

 

    render() {
        return (
            <LotShortList category={this.state.name} userid={null}/>
            )

        
    }
}
export default CategoryPage;