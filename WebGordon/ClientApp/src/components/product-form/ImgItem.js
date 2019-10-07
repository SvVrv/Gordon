import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class ImgItem extends React.Component {


    state = {
        id: this.props.id,
        main: this.props.main,
        image: this.props.image
    }

    componentDidUpdate() {
        if (this.state.image != this.props.image)
        this.setState({ image: this.props.image })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.checked });
    }
    
    render() {
        console.log("--render ImgItem", this.state);
        return (
            
            <div className="card" style={{ width: 18 + 'rem', textAlign: "center" }}>
                <img className="card-img-top" src={this.props.image} alt="Card cap" />
                <div class="form-check card-footer">
                    <input class="form-check-input" onChange={this.handleChange} type="radio" name="main" id={this.state.id} value="option1" check={this.state.main} />
                    <label class="form-check-label" for={this.state.id}>Головне фото</label>
                </div>
            </div>
            
        )

}
}
export default ImgItem;