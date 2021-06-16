import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '959950219941-n5f7kb5g7q935akg77pskjh389m7dvce.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });

    }

    onAuthChange = (isSignedIn) => {
       if (isSignedIn) {
           this.props.signIn();
       } else {
           this.props.signOut();
       }
    }


    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }


    renderAuthButton = () => {
        if (this.props.isSignedIn === null){
            return null
        } else if (this.props.isSignedIn) {
            return <button onClick={this.onSignOutClick} className="ui blue google button">Logout</button>
        } else if (!this.props.isSignedIn) {
            return (
            <button onClick={this.onSignInClick} className="ui green google button">
                <i className="google icon"></i>
                Login
            </button>)
        }
    }


    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut})(GoogleAuth);