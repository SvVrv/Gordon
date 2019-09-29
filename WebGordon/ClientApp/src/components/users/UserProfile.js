import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import './UserProfile.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import LotShort from '../../components/lot-short/Lot-short';
import ModalDialog from '../modal-dialog/Modal-dialog'
import { changeregister } from '../../actions/authActions'
import PropTypes from 'prop-types';

class UserProfile extends Component {
    state = {
        profile: []
    }
    componentDidMount = () => {
        axios.get('api/user/profile')
            .then(res => {
            const profile = res.data;
            this.setState({ profile });
            console.log("-----component did mount---", this.state);
        });
    }

    printField = (key, value) => {
        return (<span><b>{key}:</b> {value}</span>)
    }


    getfromModal = (name, value) => {
        console.log('--from modal--', name, value)

        let errors = {};
        if (name === 'Name' && value === '') errors.name = "Поле є обов'язковим!"
        if (name === 'Email' && value === '') errors.email = "Поле є обов'язковим!"
        if (name === 'Phone' && value === '') errors.phone = "Поле є обов'язковим!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            let newProfile = null;
            if (name === 'Name')
                newProfile = { ...this.state.profile, name: value, changed: "Name" };
            if (name === 'Email')
                newProfile = { ...this.state.profile, email: value, changed: "Email" };
            if (name === 'Phone')
                newProfile = { ...this.state.profile, phone: value, changed: "Phone" };
            if (name === 'Description')
                newProfile = { ...this.state.profile, description: value, changed: "Description" };


            this.setState({ isLoading: true });
            console.log('---SEND DATA changed profile----', { newProfile });
            this.props.changeregister({
                Id: newProfile.id,
                Name: newProfile.name,
                Telnumber: newProfile.phone,
                Email: newProfile.email,
                Description: newProfile.description,
                Changed: newProfile.changed
            })
                .then(
                    () => { }, //this.setState({ done: true }),
                    (err) => this.setState({ errors: err.response.data, isLoading: false })
            )
                .then(() => {
                    axios.get('api/user/profile')
                    .then(res => {
                        const profile = res.data;
                        this.setState({ profile });
                        console.log("-----axios profile updated---", this.state);
                    })
                }
            )
        }
        else {
            this.setState({ errors });
            alert("Введено невірні дані");
        }
    }


    render() {

        const childName = {
            type: "text",
            name: 'Name',
            value:  this.state.profile.name ,
            descr: 'Ваше імя користувача'
        };
        const childEmail = {
            type: "text",
            name: 'Email',
            value: this.state.profile.email,
            descr: 'Ваш E-mail'
        };

        console.log("-------------render begin---", this.state);
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
            <div className="list-group">
                <li className="list-group-item">
                    <span className="label">{this.printField("Name", this.state.profile.name)}</span>
                    <ModalDialog children={childName} getOut={this.getfromModal} />
                </li>
                <li className="list-group-item">
                    <span className="label">{this.printField("Email", this.state.profile.email)}</span>
                    <ModalDialog children={childEmail} getOut={this.getfromModal}/>
                </li>
                <li className="list-group-item">
                    <span className="label">{this.printField("Phone", this.state.profile.phone)}</span>
                    <button type="button"
                        className="btn btn-outline-success btn-sm float-right">
                        <i className="fa fa-address-card"></i>
                    </button>
                </li>
                <li className="list-group-item">
                    <span className="label">{this.printField("Description", this.state.profile.description)}</span>
                    <button type="button"
                        className="btn btn-outline-success btn-sm float-right">
                        <i className="fa fa-address-card"></i>
                    </button>
                </li>
                <li className="list-group-item">
                    <span className="label">{this.printField("Administrative acses: ", this.state.profile.type)}</span>
                    <button type="button"
                        className="btn btn-outline-success btn-sm float-right">
                        <i className="fa fa-address-card"></i>
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
                            <div className="card" >
                                <img className="card-img-top" src={this.state.profile.image ? this.state.profile.image : "https://cdn.auth0.com/blog/react-js/react.png"} alt="Userimage" />
                                <div className="card-body">
                                    <label for="uploadFile" className="card-body btn btn-light btn-block" style={{ padding: "5px" }}>
                                        <span >Змінити</span>
                                    </label>
                                    <input type="file" id="uploadFile" style={{ display: "none" }} />
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


                        


                        <LotShort
                            productQuantity="1112222"
                            lastBet="2500"
                            finishDate="31.02.2020"
                            torgStatus="активні торги"
                            productName="Дрова дубові"
                            productDescription="Продам дрова свіжовивезені, сирі, не рубані, прямо з лісу, самовинос, дорого"
                            productImage=""
                        />
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

UserProfile.propTypes =
    {
        register: PropTypes.func
    }

export default connect(mapStateToProps, { changeregister })(UserProfile);;

//<button type="button"
//    className="btn btn-outline-success btn-sm float-right">
//    <i class="fa fa-address-card"></i>
//</button>
