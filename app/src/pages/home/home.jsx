import React from 'react'
import { connect } from 'react-redux'
import ILoveYou from './jag älskar dig.png'
import './home.css'
import Heart from './heart.png'

const Name = ({ first, middle, last }) => (
  <span className="name-badge">
    <span className="first">{first}</span>
    <span className="middle">{middle}</span>
    <span className="last">{last}</span>
  </span>
)

const Home = props => (
  <div className="home">
    <p>Välkomna på bröllopet mellan</p>
    <div className="home-names">
      <Name first="Sara" middle="Linnéa" last="Aschan" />
      <img className="heart" src={Heart} />
      <Name first="Tomas" middle="Per Anders" last="Lycken" />
    </div>
    <p>lördagen den 1 september 2018!</p>
  </div>
)

export default Home
