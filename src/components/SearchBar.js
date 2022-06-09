import React, { Component } from 'react';
import '../components/style/searchBar.css'
class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            input: ""
        }
    }

    handleSearchBar = (e) => {
        this.setState({ input: e.target.value }, () => {
            this.props.handleSearchBar(this.state.input)
        })
    }

    render() {
        return (
            <input className="search-bar" type="text" value={this.state.input} onChange={this.handleSearchBar} placeholder="Search" />
        );
    }
}

export default SearchBar;