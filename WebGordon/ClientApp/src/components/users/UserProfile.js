import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Col, Clearfix } from 'react-bootstrap';
//import semen from '../../images/naturo-monkey-selfie.jpg';
import './UserProfile.scss';
import axios from 'axios';

class UserProfile extends Component {
    state = {
        profile: []
    }
    componentDidMount = () => {
        axios.get('api/user/profile').then(res => {
            const profile = res.data;
            console.log(profile);
            this.setState({ profile });
        });
    }

    printField = (key, value) => {
        return (<p><b>{key}:</b> {value}</p>)
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const clientProfile = (
            <React.Fragment>
                {this.printField("Name", this.state.profile.name)}
                {this.printField("Email", this.state.profile.email)}
                {this.printField("Phone", this.state.profile.phone)}
                {this.printField("Description", this.state.profile.clientDescription)}
            </React.Fragment>
        );
        const client2Profile = (
            <React.Fragment>
                {this.printField("Nick", this.state.profile.clientNick)}
                {this.printField("Discount", this.state.profile.clientDiscount)}
            </React.Fragment>
        );
      

 
        if (isAuthenticated) {
            return (
                <React.Fragment>
                    <div>
                        <h1>Профіль користувача</h1>
                    </div>
                    <div className="user-profile clearfix">
                        <Col sm={2} md={2}>
                            <Image className="userImage" src="https://cdn.auth0.com/blog/react-js/react.png" circle />
                        </Col>
                        <Col sm={10} md={10} >
                            {"userProfile"}
                            {this.state.profile.type === "client" && clientProfile}

                        </Col>
                    </div>
                </React.Fragment>
            );
        }
        else {
            return (
                <h1>Ви не авторизовані!</h1>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(UserProfile);;