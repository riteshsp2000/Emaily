// SurveyField contains logic to render a single label and text input
import '../../css/main.css';
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label id='custom-field'>{label}</label>
      <input {...input} id='custom-field' />
      <div className='red-text' style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
