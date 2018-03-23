import { push } from "react-router-redux";

const PROTOCOL = process.env.API_PROTOCOL || "http";
const HOST = process.env.API_HOST || "localhost";
const PORT = process.env.API_PORT || 3000;

const sendRsvpData = rsvpForm =>
  fetch(`${PROTOCOL}://${HOST}:${PORT}/rsvp`, {
    body: JSON.stringify(rsvpForm),
    method: "post",
    mode: "cors"
  });

export const POST_RSVP = "rsvp/POST_RSVP";

export const postRsvp = dispatch => formData => {
  console.log(JSON.stringify(formData));
  dispatch({
    type: POST_RSVP,
    data: formData
  });
};

export const RSVP_SUCCESSFUL = "rsvp/RSVP_SUCCESSFUL";
export const RSVP_FAILED = "rsvp/RSVP_FAILED";

export default ({ dispatch }) => next => action => {
  switch (action.type) {
    case POST_RSVP:
      sendRsvpData(action.data)
        .then(() => dispatch({ type: RSVP_SUCCESSFUL }))
        .catch(err => {
          console.error(err);
          dispatch({ type: RSVP_FAILED, err });
        });
      break;
    case RSVP_SUCCESSFUL:
      dispatch(push("/thanks"));
      break;
    case RSVP_FAILED:
      dispatch(push({ pathname: "/oops" }));
      break;
  }
  next(action);
};
