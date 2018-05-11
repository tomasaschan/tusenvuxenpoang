import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Menu, Content } from '../components.jsx'

import './page.css'

const timeout = { enter: 300, exit: 200 }

const Page = props => {
  const currentKey = location.pathname.split('/')[1] || '/'

  return (
    <div id="content" className="content">
      <Menu links={props.menuItems} />
      <div id="main">
        <h1 className="page-header">Tusen vuxenpoäng</h1>

        <TransitionGroup component="main" className="main">
          <CSSTransition
            key={currentKey}
            classNames="fade"
            timeout={timeout}
            // appear
          >
            <section className="content-body">{props.children}</section>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  )
}

Page.propTypes = {
  menuItems: PropTypes.array.isRequired
}

export default Page
