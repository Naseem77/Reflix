import React, { Component } from 'react';
import SearchBar from './SearchBar'
import Movie from './Movie'
import Budget from './Budget'
import '../components/style/catalog.css'

class Catalog extends Component {
    constructor() {
        super()
        this.state = {
            movieSearch: [],
            showNoRentalMessage: false,
            showBudgetMessage: false
        }
    }

    handleSearchBar = (input) => {
        let movieSearch = this.props.movies.filter(s =>
            s.title.toLowerCase().includes(input.toLowerCase())
        )
        this.setState({ movieSearch })
    }

    componentDidMount = async () => {
        this.setState({
            movieSearch: this.props.movies,
        })
    }
    showNoRentalMessage = () => {
        this.setState({ showNoRentalMessage: true })
        setTimeout(() => {
            this.setState({ showNoRentalMessage: false })
        }, 2500)
    }
    showBudgetMessage = () => {
        this.setState({ showBudgetMessage: true }
        )
        setTimeout(() => {
            this.setState({ showBudgetMessage: false })
        }, 2500)
    }

    render() {
        let movies = this.state.movieSearch

        let rentedMovies = []
        movies.forEach(m => {
            if (m.isRented) {
                rentedMovies.push(m)
            }
        })
        return (
            <div className="catalog-page">
                <SearchBar handleSearchBar={this.handleSearchBar} />
                {this.state.showNoRentalMessage ? <div id="rent-message"> The rent feature is available for registered users! </div> : <></>}

                {rentedMovies.length !== 0 ? <Budget budget={this.props.budget} /> : <></>}

                {rentedMovies.length !== 0 ?
                    <div className="movies-container" id="rented-container">
                        <div className="box-label">Rented</div>
                        {this.state.showBudgetMessage ? <div id="budget-message">There are insufficient funds</div> : <></>}
                        <div className="movies-box" >
                            {rentedMovies.map(r =>
                                <Movie
                                    movieInfo={r}
                                    handleRent={this.props.handleRent}
                                    boxType="rented"
                                    key={r.title} />
                            )}
                        </div>
                    </div>
                    : <></>}

                <div className="movies-container">
                    <div className="box-label">Catalog</div>
                    <div className="movies-box">
                        {movies.map(m =>
                            <Movie
                                movieInfo={m}
                                key={m.id}
                                boxType="catalog"
                                userName={this.props.userName}
                                handleRent={this.props.handleRent}
                                handleBudget={this.props.handleBudget}
                                showNoRentalMessage={this.showNoRentalMessage}
                                showBudgetMessage={this.showBudgetMessage}
                            />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Catalog;