import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions/index';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createStream(formValues, this.props.history);
    };

    render() {
        return (
            <div>
                <h3>Create Stream</h3>
                <div className="ui section divider"></div>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(null, { createStream })(StreamCreate);