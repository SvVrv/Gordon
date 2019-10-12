import React from 'react';

import { Button } from 'react-bootstrap'

class ImgItem extends React.Component {

    state = {
        id: this.props.id,
        main: this.props.main,
        image: this.props.image
    }



    componentDidUpdate() {
        if (this.state.image !== this.props.image)
            this.setState({ image: this.props.image })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.checked });
        this.props.checkMainImg(this.state.id)
    };

    render() {
     
        return (
            <div className="card" style={{ width: 18 + 'rem', textAlign: "center", margin: "3px" }}>

                <img className="card-img-top" src={this.props.image.includes(".jpg") ? "https://localhost:44365/images/" + this.props.image : this.props.image} alt="Card cap" />

                <div className="form-check card-footer" >
                    <input className="form-check-input" onChange={this.handleChange} type="radio" name="main" id={this.state.id} value="option1" check={ this.state.main.toString()} />
                    <label className="form-check-label" htmlFor={this.state.id}>Головне фото</label>
                    <Button className="btn btn-outline-success btn-sm float-right"
                        onClick={this.props.deleteImg}
                        type="button"
                        variant="outline-danger">
                        <i className="fa fa-trash" />
                    </Button>
                </div>
            </div>
        )
    }
}
export default ImgItem;