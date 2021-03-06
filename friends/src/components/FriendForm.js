import React from 'react';
import axios from 'axios';

class FriendForm extends React.Component {
    state = {
        name: '',
        age: '',
        email: '',
    };

    onChange = event => {
        let { name, value } = event.target;
        if (event.target.type === 'number') {
            value = Number(value);
        }
        this.setState({ [name]: value });
    };

    onSubmit = event => {
        event.preventDefault();
        const { name, age, email } = this.state;

        axios
            .post('http://localhost:5000/friends', {
                name,
                age,
                email,
            })
            .then(response => {
                console.log('success', response);
                this.props.updateFriends(response);
            })
            .catch(error => {
                console.error(error);
            });
        this.setState({ name: '', age: '', email: '' });
    };

    render() {
        return (
            <div className="add-friend-form">
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={this.onChange}
                        value={this.state.name}
                        autoComplete="name"
                        required
                    />
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        name="age"
                        onChange={this.onChange}
                        value={this.state.age}
                        max="120"
                    />
                    <label htmlFor="age">Email:</label>
                    <input
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        value={this.state.email}
                        autoComplete="email"
                    />
                    <button className="add-button" type="submit">
                        Add Friend
                    </button>
                </form>
            </div>
        );
    }
}

export default FriendForm;
