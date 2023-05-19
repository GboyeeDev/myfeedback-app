import { createContext, useState } from 'react';
import { useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  // const [feedback, setFeedback] = useState([
  //   {
  //     id: 1,
  //     text: 'I love Jesus!!',
  //     rating: 10,
  //   },
  // ]);

  const [isLoading, setIsLoading] = useState([]);
  const [feedback, setFeedback] = useState([]);

  // useEffect for my fetch api
  useEffect(() => {
    fetchFeedback();
  }, []);

  //Fetch data from backend
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`);

    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  // this is to edit your feedback.
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });


  // delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  // this will set item to be edited.
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  // this is to update feedback after submitting.
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json();
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
