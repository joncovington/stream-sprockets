import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions/index';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }
    
    renderAdminButtons = (stream) => {
        if(this.props.currentUserId === stream.googleUserId) {
            return (
                <div className="right floated content">
                    <div className="ui mini buttons">
                        <button className="ui primary button">Edit</button>
                        <button className="ui red button">Delete</button>
                    </div>
                </div>
            );
        };
    };

    renderList = () => {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdminButtons(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            );
        });
    };

    renderCreateButton = () => {
        
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui green button">Create Stream</Link>
                </div>
            );
        } else {
            return null;
        }
        
    };

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreateButton()}
            </div>
            
        );
    };
};

const mapStateToProps = state => {
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.googleUserId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);