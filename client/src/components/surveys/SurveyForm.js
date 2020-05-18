import '../../css/main.css';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmail';
import SurveyField from './SurveyField';

const FIELDS = [
  {
    label: 'Survey Title',
    name: 'title',
    noValueError: 'You must provide a title',
  },
  {
    label: 'Subject Line',
    name: 'subject',
    noValueError: 'You must provide a subject',
  },
  {
    label: 'Email Body',
    name: 'body',
    noValueError: 'You must provide a body',
  },
  {
    label: 'Recipients List',
    name: 'emails',
    noValueError: 'You must provide a list of emails',
  },
];

class SurveyForm extends React.Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type='text'
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div id='custom-form'>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link
            to='/surveys'
            className='red btn-flat white-text'
            id='custom-cancel-btn'
          >
            Cancel
          </Link>
          <button type='submit' className='btn-flat right' id='custom-form-btn'>
            Next <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
})(SurveyForm);
