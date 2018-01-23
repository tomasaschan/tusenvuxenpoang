const initialState = {
  message: 'bar'
};

const SET_TEST_MESSAGE = 'rd/test/SET_TEST_MESSAGE';
export const setTestMessage = message => ({
  type: SET_TEST_MESSAGE,
  message
})

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_TEST_MESSAGE:
      return { message: action.message };
    default:
      return initialState;
  }
};