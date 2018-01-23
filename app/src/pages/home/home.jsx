import React from 'react';
import { connect } from 'react-redux';

const Home = props =>
    <div>
        <h2>Välkommen till vår hemsida!</h2>
        <p>Här samlar vi info om vad som händer när vi gifter oss!</p>
        {props.msg && <p>{props.msg}</p>}
    </div>

const mapStateToProps = state => ({
    msg: state.test.message
});

export default connect(mapStateToProps)(Home);
