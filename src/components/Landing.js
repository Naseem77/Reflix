import React, { Component } from 'react';
import '../components/style/landing.css'
import User from './User'

class Landing extends Component {
    render() {
        let users = this.props.users
        return (
            <div id="profile-container">
                <div className="profile-label">Who's watching?</div>
                <ul className="choose-profile">
                    {users.map(u =>
                        <User
                            user={u}
                            key={u.name}
                            handleRegisteredUser={this.props.handleRegisteredUser}
                        />)}
                </ul>
            </div>
        )
    }
}

export default Landing;