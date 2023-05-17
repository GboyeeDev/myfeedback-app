import React from 'react';
import { useContext } from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackList() {

  const {feedback} = useContext(FeedbackContext)
  if (!feedback || feedback.length === 0) {
    return <h1>NO FEEDBACK YET</h1>;
  }
  //console.log(feedback)

  return (
    <div className="feedback-list">
      <AnimatePresence>
      {feedback.map((item) => (
        <motion.div key={item.id} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <FeedbackItem
          key={item.id}
          item={item}
        />
        </motion.div>
      ))}
      </AnimatePresence>
    </div>
  );

  // feedback list without the framer-animation
  // return (
  //   <div className="feedback-list">
  //     {feedback.map((item) => (
  //       <FeedbackItem
  //         key={item.id}
  //         item={item}
  //         deleteHandler={deleteHandler}
  //       />
  //     ))}
  //   </div>
  // );
}

export default FeedbackList;
