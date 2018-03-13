import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import { setAttending } from '../../store/reducer/actions.js'
import { Form, FieldSet, RadioGroup, TextBox, TextArea, SubmitButton, NumberTextBox, Button } from '../../components/form/form.jsx'
import './rsvp.css'

const timeout = { enter: 300, exit: 0 }

class NameInput extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.input.focus()
  }

  render() {
    return <input
      ref={(input) => { this.input = input }}
      name="namn"
      type="text"
      value={this.props.name}
      onChange={this.props.onChange} />
  }
}

class RsvpForm extends React.Component {
  constructor(props) {
    super(props)
    this.setCount = this.setCount.bind(this)
    this.state = {
      names: ['']
    }
    this.names = []
  }

  setCount(e) {
    this.setState({ count: e.target.value })
  }

  render() {
    const props = {
      ...this.props,
      ...this.state
    };
    const actions = {
      updateName: k => e => {
        var value = e.target.value
        this.setState(prev => {
          const names = [...prev.names]
          names[k] = value
          return { names }
        })
      },
      addOne: () => {
        this.setState(prev =>
          Object.assign({}, prev, { names: [...prev.names, ''] }))
      },
      remove: k => () => this.setState(prev =>
        Object.assign({}, prev, { names: prev.names.filter((n, i) => i !== k) }))
    }

    const names = [...props.names.keys()].map(k =>
      <div className="name-line" key={`name_${k}`}>
        <NameInput
          name={props.names[k]}
          onChange={actions.updateName(k)} />
        <span className="remove-one" onClick={actions.remove(k)}>
          <i className="fa fa-minus-square"></i>
        </span>
      </div >
    );

    const multi = props.names.length >= 2;
    const you = !multi ? 'du' : 'ni';
    const ime = !multi ? 'jag' : 'vi';

    return <div>
      <Form>
        <div className="form-control">
          <label>
            {`Vad heter ${you}?`}
            <div className="names">
              {names}
              <div className="name-line">
                <span className="add-one" onClick={actions.addOne}>
                  <i className="fa fa-plus-square"></i>
                </span>
              </div>
            </div>
          </label>
        </div>

        <RadioGroup
          label={`Kommer ${you}?`}
          name="rsvp"
          options={[
            { value: 'ja', text: `Klart ${ime} gör!` },
            { value: 'nej', text: `Nej, ${ime} kan inte :(` }
          ]}
          onSelect={props.setAttending}
          selected={props.attending} />

        <TransitionGroup component='rsvp' className='rsvp'>
          <CSSTransition
            key={`attending_${props.attending}`}
            classNames={{
              appear: 'fade-appear',
              enter: 'fade-enter',
              enterActive: 'fade-enter-active',
              appearActive: 'fade-appear-active'
            }}
            timeout={timeout}>
            <div>
              {props.attending === 'ja'
                ? <Attending multi={multi} />
                : props.attending === 'nej'
                  ? <NotAttending multi={multi} />
                  : null}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Form>

    </div >
  }
}


const Attending = props =>
  <div>
    <p>Hurra, vad roligt!</p>

    <p>Då behöver vi veta lite mer:</p>

    <TextArea name="food" label={`Har ${props.multi ? 'ni' : 'du'} några specialmatsbehov?`} />

    <StayingOver {...props} />

    <SubmitButton text="Svara" />
  </div>

class StayingOver extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props
    return <RadioGroup
      label={`Vill ${props.multi ? 'ni' : 'du'} bo på Granhedsgården natten 1-2 september?`
      }
      options={
        [
          { value: 'ja', text: 'Ja, gärna!' },
          { value: 'nej', text: 'Nej, vi sover någon annanstans.' }
        ]}
    />

  }
}

const NotAttending = props =>
  <div>
    <p>Vad tråkigt! Vi kommer sakna {props.multi ? 'er' : 'dig'}. Men vi hoppas att vi ses nån annan gång!</p>
    <SubmitButton text="Svara" />
  </div>


const stateToProps = state => ({
  attending: state.rsvp.attending
})
const dispatchToProps = dispatch => ({
  setAttending: setAttending(dispatch)
})

export default connect(stateToProps, dispatchToProps)(RsvpForm)
