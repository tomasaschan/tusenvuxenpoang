import React from 'react'
import { connect } from 'react-redux'

export const NotFound = () => <p>Oops... den här sidan finns inte!</p>

export const Oops = () => (
  <div>
    <h2>Oops, nu gick nåt lite snett!</h2>
    <p>Försök igen, eller be Tomas laga...</p>
  </div>
)
