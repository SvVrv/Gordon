import React from 'react';
import axios from 'axios';
import { Card, Col } from 'react-bootstrap';

class CategoryItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            image: this.props.image
        };
    }

    handleClick = () => {
        console.log('klick', this.state.name);
    }
    
render() {
            return (
                <a style={{ cursor: 'pointer' }} onClick={this.handleClick}>
            <Card style={{ width: '18rem', height: '320px' }} >
                <Card.Header as="h1">{this.state.name}</Card.Header>
                <Card.Img src={this.state.image} />
            </Card>
            </a>
        )

}
}
export default CategoryItem;