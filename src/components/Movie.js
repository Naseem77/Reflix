import React, { Component } from 'react';
import '../components/style/movie.css'

class Movie extends Component {

    handleRent = async (event) => {
        event.preventDefault();
        let userExist = this.props.userName
        if (userExist !== undefined) {
            let legitRental = await this.props.handleBudget(this.props.movieInfo.isRented)
            if (legitRental) { this.props.handleRent(this.props.movieInfo) }
            else { this.props.showBudgetMessage() }
        } else {
            this.props.showNoRentalMessage()
        }

    }

    render() {
        let movie = this.props.movieInfo
        let boxType = this.props.boxType
        return (
            <a href={`/movie/${movie.id}`}>
                <div
                    className="movie" style={{ backgroundImage: `url(${movie.img})` }}>
                    {boxType === "catalog" ?
                        movie.isRented ?
                            <i className="fas fa-minus-circle minus" onClick={this.handleRent}></i> :
                            <i className="fas fa-plus-circle plus" onClick={this.handleRent}></i>
                        : <></>
                    }
                </div>
            </a>
        )
    }
}

export default Movie;