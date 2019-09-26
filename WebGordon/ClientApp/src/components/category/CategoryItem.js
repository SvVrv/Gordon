import React from 'react';
import axios from 'axios';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
class CategoryItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            image: this.props.image
        };
    }

    
    render() {
        const path = "/" +  this.state.name ;
    return (
        <Link to={path} style={{ cursor: 'pointer' }} >
            <Card style={{ width: '18rem', height: '320px' }} >
                <Card.Header as="h1">{this.state.name}</Card.Header>
                <Card.Img src={this.state.image} />
            </Card>
        </Link>
        )

}
}
export default CategoryItem;