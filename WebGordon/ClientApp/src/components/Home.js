import React from 'react';
import { connect } from 'react-redux';
import { store } from '../index';
import CategoryItem from './category/CategoryItem'
import CategoryList from './category/CategoryList'


const Home = props => (
    <div>
        <CategoryList />
    </div>

);
export default connect()(Home);
