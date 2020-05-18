// SurveyFormReview shows users their form inputs for review and final Submission
import React from 'react';

const SurveyFormReview = ({ onCancel }) => {
  return (
    <div>
      <h5>Please confirm the details.</h5>
      <button className='yellow darken-3 btn-flat' onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

export default SurveyFormReview;
