import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Col, Clearfix } from 'react-bootstrap';
//import semen from '../../images/naturo-monkey-selfie.jpg';
import './UserProfile.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'

class UserProfile extends Component {
    state = {
        profile: []
    }
    componentDidMount = () => {
        axios.get('api/user/profile').then(res => {
            const profile = res.data;
            console.log("-------------profile did mount---", profile);
            this.setState({ profile });
        });
    }

    printField = (key, value) => {
        return (<p><b>{key}:</b> {value}</p>)
    }


    render() {
        console.log("-------------profile did mount---", this.state.profile);
        const style1 = {            width: '100% '      };
        const { isAuthenticated } = this.props.auth;
        const clientProfile = (
            <React.Fragment>
                {this.printField("Name", this.state.profile.name)} 
                {this.printField("Email", this.state.profile.email)}
                {this.printField("Phone", this.state.profile.phone)}
                {this.printField("Description", this.state.profile.description)}
            </React.Fragment>
        );
        const adminProfile = (
            <React.Fragment>
                {this.printField("Name", this.state.profile.name)}
                {this.printField("Email", this.state.profile.email)}
                {this.printField("Phone", this.state.profile.phone)}
                {this.printField("Description", this.state.profile.description)}
                {this.printField("Administrative acses: ", this.state.profile.type)}
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
                            <Image className="userImage" src={this.state.profile.image } style={style1}  circle />
                        </Col>
                        <Col sm={10} md={10} >
                            {"userProfile"}
                            {this.state.profile.type === "client" && clientProfile}
                            {this.state.profile.type === "Admin" && adminProfile}
                        </Col>
                    </div>
                </React.Fragment>
            );
        }
        else {
            return (
                <div className="container" style={{ textAlign: "center" }} >
                    <h1 style={{ textAlign: "center" }}>Ви не авторизовані!</h1>
                    <Button color="primary">
                        <Link className="text-white nav-link" to="/login">Авторизуватися зараз</Link>
                    </Button>
                </div>
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