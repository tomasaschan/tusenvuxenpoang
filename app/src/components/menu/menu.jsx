import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import MobileMenu from 'react-burger-menu/lib/menus/slide'

import './burger-menu.css'
import './menu.css'

const MenuItem = props => (
  <li>
    <NavLink exact to={props.url}>
      {props.text}
    </NavLink>
  </li>
)

MenuItem.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

const Menu = props => (
  <div>
    <nav className="full-menu">
      <ul>{props.links.map((l, i) => <MenuItem key={i} {...l} />)}</ul>
    </nav>
    <MobileMenu
      className="mobile-menu"
      pageWrapId="main"
      outerContainerId="content"
      right
    >
      <ul>{props.links.map((l, i) => <MenuItem key={i} {...l} />)}</ul>
    </MobileMenu>
  </div>
)

Menu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape(MenuItem.propTypes)).isRequired
}

export default Menu
