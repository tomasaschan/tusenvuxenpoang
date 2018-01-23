import Home from './home/home.jsx'
import Practicalities from './practicalities/practicalities.jsx'
import Rsvp from './rsvp/rsvp.jsx'
export { default as NotFound } from './not-found/not-found.jsx'

export const menuItems = [
  { url: '/', text: 'Hem', component: Home, exact: true },
  { url: '/vuxenpoang', text: 'Vuxenpoäng' },
  { url: '/praktisk-info', text: 'Praktisk info', component: Practicalities },
  { url: '/foton', text: 'Fotoalbum' },
  { url: '/osa', text: 'O.S.A.', component: Rsvp }
];
