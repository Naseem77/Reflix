import React, { Component } from 'react';
import '../components/style/movieDetails.css'
class MovieDetails extends Component {

    render() {
        const val = this.props.match.params.id
        let currentMovie = this.props.movies[val]
        console.log(currentMovie)
        return (
            <div id="movie-container">
                <div className="title" >{currentMovie.title} ({currentMovie.year})</div>
                <img src={currentMovie.img} alt="movie-img" />
                <div className="description">{currentMovie.descrShort}</div>
            </div>
        )


    }
}

export default MovieDetails;