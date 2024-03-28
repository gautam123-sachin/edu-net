// actions.js
export const updateCourseForm = (name, value) => ({
    type: 'UPDATE_COURSE_FORM',
    payload: { name, value },
  });
  
  export const setErrors = (errors) => ({
    type: 'SET_ERRORS',
    payload: errors,
  });
  
  export const setSnackbar = (open, message, severity) => ({
    type: 'SET_SNACKBAR',
    payload: { open, message, severity },
  });
  