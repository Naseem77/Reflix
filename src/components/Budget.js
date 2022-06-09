import React, { Component } from 'react';
import '../components/style/budget.css'
class Budget extends Component {
    render() {
        return <div id="budget">Your Budget: ${this.props.budget}</div>;
    }
}

export default Budget;