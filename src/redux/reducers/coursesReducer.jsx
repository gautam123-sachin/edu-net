// reducers.js
const initialState = {
    // Define your initial state here
    courseForm: {
      title: '',
      teacherId: '',
      teacherName: '',
      description: '',
      category: '',
      video: '',
      thumbnailUrl: '',
    },
    errors: {},
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: 'success',
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_COURSE_FORM':
        return {
          ...state,
          courseForm: {
            ...state.courseForm,
            [action.payload.name]: action.payload.value,
          },
        };
      case 'SET_ERRORS':
        return {
          ...state,
          errors: action.payload,
        };
      case 'SET_SNACKBAR':
        return {
          ...state,
          snackbarOpen: action.payload.open,
          snackbarMessage: action.payload.message,
          snackbarSeverity: action.payload.severity,
        };
      // Add more cases as needed
      default:
        return state;
    }
  };
  
  export default rootReducer;
  