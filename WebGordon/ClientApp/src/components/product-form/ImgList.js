import React from 'react';
import ImgItem from './ImgItem'


class ImgList extends React.Component {

    state = {
        images: this.props.images
    }

    deleteImg = this.props.deleteImg;


    componentDidUpdate = () => {
        if (this.state.images !== this.props.images)
            this.setState((prevstate) => {
                return ({ images: this.props.images })
            })
            }

    render() {
        console.log("-render List", this.state);
        const list = this.state.images.map((item) => {
            return (
                <ImgItem
                    id={item.id}
                    image={item.image}
                    main={item.main}
                    deleteImg={() => this.props.deleteImg(item.id)}
                    checkMainImg={() => this.props.checkMainImg(item.id)}
                />);
        });

        return (
            <div className="row">
                {list}
            </div>
        )
    }
}


export default ImgList;