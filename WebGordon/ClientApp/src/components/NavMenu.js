import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { connect } from 'react-redux';

 class NavMenu extends React.Component {
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
     }
     isauth (){
         const isAuth = this.props.isAuthenticated;
         if (isAuth) 
             {
                 return[ (<li className="nav-item">
                     <Link className="text-dark nav-link" to="/logout">Logout</Link>
                     </li>),
                     (<li className="nav-item">
                         <Link className="text-dark nav-link" to="/profile">Profile</Link>
                     </li>)]
             }
         else {
             return [(<li className="nav-item">
                 <Link className="text-dark nav-link" to="/login">Login</Link>
                 </li>),
                 (<li className="nav-item">
                     <Link className="text-dark nav-link" to="/register">Register</Link>
                 </li>)]
             }
         
     }
     render() {
       
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
          <Container>
            <NavbarBrand tag={Link} to="/">WebGordon</NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
               
                            {this.isauth()} 
                
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(NavMenu);
