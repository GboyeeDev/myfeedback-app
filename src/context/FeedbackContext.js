import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  // const [feedback, setFeedback] = useState([
  //   {
  //     id: 1,
  //     text: 'I love Jesus!!',
  //     rating: 10,
  //   },
  // ]);

  const [feedback, setFeedback] = useState(FeedbackData);

  // this is to edit your feedback.
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };


  // this will set item to be edited.
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };


  // this is to update feedback after submitting.
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id) ? {...item, ...updItem} : item)
    );
  };

  return (
    <FeedbackContext.Provider value={{ feedback, deleteFeedback, addFeedback, editFeedback, feedbackEdit, updateFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
