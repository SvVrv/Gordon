import React from 'react';
import axios from 'axios';
import CategoryItem from './CategoryItem'

class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categorys: []
        }
    };

    componentDidMount = () => {
        axios.get('api/Categories').then(res => {
            const categorys = res.data;
            this.setState({ categorys });

        });
    }



    render() {
        const urlimg = "https://localhost:44365/images/"
        const list = this.state.categorys.map((item) => {
            return (<CategoryItem name={item.name} image={urlimg + item.image} />
           ) });
        
        return (
            <div>
                {list}
            </div>
            )

        }

}



export default CategoryList;