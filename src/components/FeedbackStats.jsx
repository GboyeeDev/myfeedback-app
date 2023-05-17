import React, { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext';

function FeedbackStats() {
    // getting feeback data using CONTEXT API instead of props
    const { feedback } = useContext(FeedbackContext);

    // calculating rating average
    let average = feedback.reduce((acc, cur) => {
        return acc + cur.rating;
    }, 0) / feedback.length;

    //console.log(average);

    // To make average show in one decimal place
    average = average.toFixed(1).replace(/[.,]0$/, '');

  return (
    <div className='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

export default FeedbackStats