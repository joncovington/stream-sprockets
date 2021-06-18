import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editStream(
            this.props.stream.id,
            formValues,
            this.props.history
        );
    };

    render() {
        if(!this.props.stream){
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit Stream</h3>
                <div className="ui section divider"></div>
                <StreamForm 
                    onSubmit={this.onSubmit}
                    // w/o lodash:
                    // initialValues={{ 
                    //     title: this.props.stream.title,
                    //     description: this.props.stream.description
                    // }}
                    // w/ lodash:
                    initialValues={
                        _.pick(
                            this.props.stream,
                            'title',
                            'description'
                        )
                    }
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);