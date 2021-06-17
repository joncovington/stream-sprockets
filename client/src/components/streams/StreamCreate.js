import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {

    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, ph, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} placeholder={ph} autoComplete="off" />
                {this.renderError(meta)}
            </div>
            
        );
    };

    onSubmit(formValues) {
        console.log(formValues)
    };

    render() {
        return (
            <div>
                <h2>Create Stream</h2>
                <div className="ui section divider"></div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="title" component={this.renderInput} ph="Enter Title" label="Title"/>
                    <Field name="description" component={this.renderInput}ph="Enter Description" label="Description"/>
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        );
    }
}

const validate = (formValues) => {
    const errors = {}

    if (!formValues.title) {
        errors.title = 'You must enter a title.';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description.';
    }

    return errors;
};

export default reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);