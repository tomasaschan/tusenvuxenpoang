import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
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
  <nav>
    <ul>{props.links.map((l, i) => <MenuItem key={i} {...l} />)}</ul>
  </nav>
)

Menu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape(MenuItem.propTypes)).isRequired
}

export default Menu
