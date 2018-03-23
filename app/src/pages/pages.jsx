import Home from "./home/home.jsx";
import Practicalities from "./practicalities/practicalities.jsx";
import Rsvp from "./rsvp/rsvp.jsx";
export { NotFound } from "./errors/errors.jsx";
export { Oops } from "./errors/errors.jsx";
export { default as Thanks } from "./rsvp/thanks.jsx";

export const menuItems = [
  { url: "/", text: "Hem", component: Home, exact: true },
  { url: "/vuxenpoang", text: "Vuxenpoäng" },
  { url: "/praktisk-info", text: "Info", component: Practicalities },
  { url: "/foton", text: "Fotoalbum" },
  { url: "/osa", text: "O.S.A.", component: Rsvp }
];
