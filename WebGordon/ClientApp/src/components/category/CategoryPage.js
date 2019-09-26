import React from 'react';

class CategoryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
    };
    render() {
        return (
            <h1>{this.state.name} </h1>
            )

        
    }
}
export default CategoryPage;