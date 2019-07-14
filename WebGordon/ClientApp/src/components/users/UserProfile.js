import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Col, Clearfix } from 'react-bootstrap';
import semen from '../../images/naturo-monkey-selfie.jpg';
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
                    <Clearfix>
                        <h1>Профіль користувача</h1>
                    </Clearfix>
                    <Clearfix className="user-profile">
                        <Col sm={2}>
                            <Image className="userImage" src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BMDQ3ZDEyZmUtYjkyNC00YzI1LTgzYmUtNmQzZmY3ZjYzNjMyXkEyXkFqcGdeQXVyMTkxMTU0MTE%40._V1_UY317_CR20%2C0%2C214%2C317_AL_.jpg&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Fname%2Fnm3709243%2F&docid=9eT17hzXbQRw2M&tbnid=lLnFKRAbYp8iFM%3A&vet=10ahUKEwjD8sTyrrTjAhUP2aYKHWrFA9IQMwhQKAQwBA..i&w=214&h=317&bih=786&biw=1164&q=ava&ved=0ahUKEwjD8sTyrrTjAhUP2aYKHWrFA9IQMwhQKAQwBA&iact=mrc&uact=8" circle />
                        </Col>
                        <Col sm={10}>
                            {"userProfile"}
                            {this.state.profile.type === "client" && clientProfile}

                        </Col>
                    </Clearfix>
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