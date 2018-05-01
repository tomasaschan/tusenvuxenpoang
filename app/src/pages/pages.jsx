import Home from './home/home.jsx'
import WeddingWeekend from './wedding-weekend/wedding-weekend.jsx'
import Accommodation from './accommodation/accommodation.jsx'
import Rsvp from './rsvp/rsvp.jsx'
export { NotFound } from './errors/errors.jsx'
export { Oops } from './errors/errors.jsx'
export { default as Thanks } from './rsvp/thanks.jsx'

export const menuItems = [
  { url: '/', text: 'Hem', component: Home, exact: true },
  { url: '/brollopshelgen', text: 'Bröllopshelgen', component: WeddingWeekend },
  { url: '/accommodation', text: 'Övernattning', component: Accommodation },
  { url: '/osa', text: 'O.S.A.', component: Rsvp }
]
