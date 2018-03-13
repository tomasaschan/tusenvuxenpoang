const initialState = {

}

const SET_NAME = 'rsvp/SET_NAME'
export const setName = dispatch => name => dispatch({
  type: SET_NAME,
  data: name
})
const SET_ATTENDING = 'rsvp/SET_ATTENDING'
export const setAttending = dispatch => attending => dispatch({
  type: SET_ATTENDING,
  data: attending
})

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.data }
    case SET_ATTENDING:
      return { ...state, attending: action.data }
    default:
      return state
  }
}