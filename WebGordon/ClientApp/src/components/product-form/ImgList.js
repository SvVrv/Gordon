import React from 'react';
import axios from 'axios';
import ImgItem from './ImgItem'


class ImgList extends React.Component {

    state = {
        images: this.props.images
    }

    componentDidUpdate = () => {
        if (this.state.images != this.props.images)
            this.setState((prevstate) => {
                return ({ images: this.props.images })
            })
            }

    render() {
        console.log("-render List", this.state)
        const list = this.state.images.map((item) => {
            return <ImgItem id={item.id} image={item.image} main={item.main} />
        });

        return (
            <div className="row">
                {list}
            </div>
        )
    }
}


export default ImgList;