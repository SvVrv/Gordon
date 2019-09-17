import React from 'react';
import axios from 'axios';


class CategoryItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            image: this.props.image
        };
    }
    
    
render() {
        return (
            <div>
                <img src={this.state.image} />
                <h1>{this.state.name}</h1>
            </div>
        )

}
}
export default CategoryItem;