import React from 'react';
import { connect } from 'react-redux';
import CategoryList from './category/CategoryList'


const Home = props => (
    <div>
        <CategoryList />
    </div>

);
export default connect()(Home);
