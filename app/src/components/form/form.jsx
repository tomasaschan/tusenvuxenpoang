import React from 'react'
import PropTypes from 'prop-types'
import './form.css'

const Form = props =>
  <iframe
    className="embeddedForm"
    src={props.src}
    frameBorder="0"
    marginHeight="0"
    marginWidth="0">
    Snart så...
    </iframe>

Form.propTypes = {
  src: PropTypes.string.isRequired
}

export default Form
