import React from 'react';
import axios from 'axios';
import CategoryItem from './CategoryItem'
class CategoryList extends React.Component {

        state = {
            images: []
        }

    componentDidMount = () => { }


    render() {
        const urlimg = "https://localhost:44365/images/"
        const list = this.state.images.map((item) => {
            return <CategoryItem name={item.name} image={urlimg + item.image} key={item.name}/>
           });
        
        return (
            <div className="row">
                {list}
            </div>
            )

        }

}



export default CategoryList;