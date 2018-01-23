import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Menu, Content } from '../components.jsx'

import './page.css'

const timeout = { enter: 300, exit: 200 }

const Page = props => {
  const currentKey = location.pathname.split('/')[1] || '/'

  return (<div className="content">
    <h1 className="page-header">Tusen vuxenpoäng</h1>
    <Menu links={props.menuItems} />

    <TransitionGroup component='main' className='main'>
      <CSSTransition
        key={currentKey}
        classNames='fade'
        timeout={timeout}
        appear>
        <section className='content-body'>
          {props.children}
        </section>
      </CSSTransition>
    </TransitionGroup>
  </div>)
}

Page.propTypes = {
  menuItems: PropTypes.array.isRequired
}

export default Page