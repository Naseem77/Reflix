import React, { Component } from "react"
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Catalog from "./components/Catalog";
import Landing from "./components/Landing";
import MoviesData from "./components/data/MoviesData"
import UsersData from "./components/data/UsersData"
import MovieDetails from "./components/MovieDetails"


class App extends Component {
  constructor() {
    super()
    this.state = {
      userName: "",
      budget: 0,
      moviesData: MoviesData,
      userData: UsersData
    }
  }
  onMouseOver = event => {
    const el = event.target;
    let colorhex = [
      "#7AF377",
      "#3498DB",
      "#F1C530",
      "#F29C29",
      "#8E44AD",
      "#4AA086",
      "#E74C3C",
      "#65CC71",
      "#D3541B",
      "#EB4367",
      "#74F7D9",
      "#DDA8FC"
    ];
    el.style.color = colorhex[Math.floor(Math.random() * 12)];
  };

  onMouseOut = event => {
    const el = event.target;
    let colorChange = "#ff0000";
    el.style.color = colorChange;
  };
  handleRent = (movieInfo) => {
    let rentalStatus = movieInfo.isRented;
    let isRented = !rentalStatus;

    let movies = this.state.moviesData;
    movies[movieInfo.id].isRented = isRented;
    this.setState({ moviesData: movies }, () => {
      this.saveUserInfo();
    });
  };

  handleBudget = (rentalStatus) => {
    let isRented = !rentalStatus;

    if (!isRented) {
      this.setState({ budget: this.state.budget + 3 });
    } else {
      if (this.state.budget - 3 < 0) {
        return false;
      } else {
        this.setState({ budget: this.state.budget - 3 });
      }
    }
    return true;
  };

  saveUserInfo = async () => {
    let rentedMovies = [];
    let movies = this.state.moviesData;
    await movies.forEach((m) => {
      if (m.isRented) {
        rentedMovies.push(m);
      }
    });

    let UserInfo = {
      rentedMovies: rentedMovies,
      budget: this.state.budget,
    };

    localStorage[this.state.userName] = JSON.stringify(UserInfo);
  };

  renderSavedUserInfo = () => {
    this.restartMoviesInfo();

    let user = JSON.parse(localStorage[this.state.userName] || null);
    if (user && user.rentedMovies.length > 0) {
      this.handlePrevUsersData(user);
    } else if (localStorage.currentUserName !== ("undefined" || undefined)) {
      this.handleCurrUsersData();
    } else {
      console.log("user doesn't exist");
    }
  };

  restartMoviesInfo = () => {
    let movies = this.state.moviesData;
    for (let m in movies) {
      movies[m].isRented = false;
    }
    this.setState({ moviesData: movies });
  };

  handlePrevUsersData = (user) => {
    let movies = this.state.moviesData;
    let budget = user.budget;

    for (let movie of user.rentedMovies) {
      movies[movie.id].isRented = true;
    }

    this.setState({
      moviesData: movies,
      budget: budget,
    });
  };

  handleCurrUsersData = () => {
    let movies = this.state.moviesData;
    let user = this.state.userData.filter(
      (u) => u.name === this.state.userName
    )[0];
    let budget = user.budget;
    let userInfo = {
      rentedMovies: [],
      budget: budget,
    };
    localStorage[this.state.userName] = JSON.stringify(userInfo);

    this.setState({
      moviesData: movies,
      budget: budget,
    });
  };

  handleRegisteredUser = (userName) => {
    this.setState({ userName }, () => {
      localStorage.currentUserName = userName;
      this.renderSavedUserInfo();
    });
  };
  SignOut = () => {
    this.handleRegisteredUser(undefined)
  }

  render() {
    let movies = this.state.moviesData
    let userInfo = this.state.userData.filter((u) => u.name === this.state.userName)[0];

    return (
      <Router>
        <div>
          <div className="header">
            <Link to="/" className="header-link">Home</Link>
            <Link to="/Catalog" className="header-link"> Catalog</Link>

            {userInfo !== undefined ? (
              <Link to="/" onClick={this.SignOut}>
                <div
                  id="user-icon"
                  style={{ backgroundImage: `url(${userInfo.img})` }}
                ></div>
              </Link>
            ) : null}

            <div id="logo" onMouseEnter={event => this.onMouseOver(event)}
              onMouseOut={event => this.onMouseOut(event)}>REFLIX</div>
          </div>
          <div id="app-background"></div>
          <Route exact path="/"
            render={() => <Landing
              users={this.state.userData}
              handleRegisteredUser={this.handleRegisteredUser}
            />}
          />
          <Route exact
            path="/movie/:id"
            exact render={({ match }) => <MovieDetails match={match}
              movies={movies}
            />} />

          <Route exact path="/Catalog"
            render={() => <Catalog
              movies={movies}
              userName={this.state.userName}
              budget={this.state.budget}
              handleBudget={this.handleBudget}
              handleRent={this.handleRent}
            />}
          />
        </div>
      </Router>
    )
  }
}

export default App;
