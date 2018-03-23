import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import postRsvp from "./post-rsvp";

export default ({ history }) => [thunk, routerMiddleware(history), postRsvp];
