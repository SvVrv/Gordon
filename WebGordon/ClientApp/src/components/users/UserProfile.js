import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Col, Clearfix } from 'react-bootstrap';
import './UserProfile.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import LotShortList from '../../components/lot-short/Lot-short-list';
import ModalDialog from '../modal-dialog/Modal-dialog'

class UserProfile extends Component {
    state = {
        profile: []
       
    }
    componentDidMount = () => {
        
        axios.get('api/user/profile').then(res => {
            const profile = res.data;
            //console.log("-------------component did mount---", profile);
            this.setState( { profile } );
           
          


        });
    }

    printField = (key, value) => {
        return (<span><b>{key}:</b> {value}</span>)
    }


    render() {
        const children1 = { name: 'NAMmmmME', value: 'VALUE', descr: 'sdfsafasfsadfsdf' };

        console.log("-------------profile did mount---", this.state.profile);
        const style1 = { width: '100% ' };
        const { isAuthenticated } = this.props.auth;
        const clientProfile = (
            <div class="list-group">
                <li class="list-group-item">{this.printField("Name", this.state.profile.name)}</li>
                <li class="list-group-item">{this.printField("Email", this.state.profile.email)}</li>
                <li class="list-group-item">{this.printField("Phone", this.state.profile.phone)}</li>
                <li class="list-group-item">{this.printField("Description", this.state.profile.description)}</li>
            </div>
        );
        const adminProfile = (
            <div class="list-group">
                <li class="list-group-item">
                    <span className="label">{this.printField("Name", this.state.profile.name)}</span>
                    <ModalDialog children1={ children1 } />
                </li>
                <li class="list-group-item">
                    <span className="label">{this.printField("Email", this.state.profile.email)}</span>
                    <ModalDialog children1={children1} />
                </li>
                <li class="list-group-item">
                    <span className="label">{this.printField("Phone", this.state.profile.phone)}</span>
                    <button type="button"
                        className="btn btn-outline-success btn-sm float-right">
                        <i class="fa fa-address-card"></i>
                    </button>
                </li>
                <li class="list-group-item">
                    <span className="label">{this.printField("Description", this.state.profile.description)}</span>
                    <button type="button"
                        className="btn btn-outline-success btn-sm float-right">
                        <i class="fa fa-address-card"></i>
                    </button>
                </li>
                <li class="list-group-item">
                    <span className="label">{this.printField("Administrative acses: ", this.state.profile.type)}</span>
                    <button type="button"
                        className="btn btn-outline-success btn-sm float-right">
                        <i class="fa fa-address-card"></i>
                    </button>
                </li>
             </div>
        );

        if (isAuthenticated) {
            return (
                <React.Fragment>
                    <div>
                        <h1 style={{ textAlign: "center" }}>Профіль користувача</h1>
                    </div>
                    <div className="row">
                        <Col sm={3} md={3}>
                            <div class="card" >
                                <img class="card-img-top" src={this.state.profile.image ? this.state.profile.image : "https://cdn.auth0.com/blog/react-js/react.png"} />
                                <div class="card-body">
                                    <a href="#" class="btn btn-light btn-block" role="button">Змінити</a>
                                </div>
                            </div>
                        </Col>
                        <Col sm={9} md={9} >
                            {this.state.profile.type === "Client" && clientProfile}
                            {this.state.profile.type === "Admin" && adminProfile}
                        </Col>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <h4 >Ваші торги</h4>

                        <LotShortList userid={3} category={null} />
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

//<button type="button"
//    className="btn btn-outline-success btn-sm float-right">
//    <i class="fa fa-address-card"></i>
//</button>
