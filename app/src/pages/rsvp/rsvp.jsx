import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import {
  Form,
  FieldSet,
  RadioGroup,
  TextBox,
  TextArea,
  SubmitButton,
  NumberTextBox,
  Button
} from '../../components/form/form.jsx'
import './rsvp.css'

import { postRsvp } from '../../store/middleware/post-rsvp'

const timeout = { enter: 300, exit: 0 }

class NameInput extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.input.focus()
  }

  render() {
    return (
      <input
        ref={input => {
          this.input = input
        }}
        name="namn"
        type="text"
        value={this.props.name}
        onChange={this.props.onChange}
      />
    )
  }
}

class RsvpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      names: [''],
      attending: 'not specified',
      errors: {
        names: '',
        attending: '',
        staying: ''
      }
    }

    this.updateName = this.updateName.bind(this)
    this.addOne = this.addOne.bind(this)
    this.remove = this.remove.bind(this)
    this.setAttending = this.setAttending.bind(this)
    this.setFoods = this.setFoods.bind(this)
    this.setStaying = this.setStaying.bind(this)
    this.submit = this.submit.bind(this)
  }

  updateName(k) {
    return ({ target: { value } }) => {
      this.setState(prev => {
        const names = [...prev.names]
        names[k] = value
        return { names }
      }, this.validate())
    }
  }

  addOne() {
    this.setState(
      prev => Object.assign({}, prev, { names: [...prev.names, ''] }),
      this.validate()
    )
  }

  remove(k) {
    return () =>
      this.setState(
        prev =>
          Object.assign({}, prev, {
            names: prev.names.filter((n, i) => i !== k)
          }),
        this.validate()
      )
  }

  setStaying(staying) {
    this.setState({ staying }, this.validate())
  }

  setFoods(e) {
    this.setState({ foods: e.target.value }, this.validate())
  }

  setAttending(attending) {
    this.setState({ attending }, this.validate())
  }

  validate(callback) {
    return () => {
      if (!this.state.submitted) {
        return
      }
      const you = this.state.names.length > 1 ? 'ni' : 'du'
      const errors = {}
      if (
        this.state.names.length === 0 ||
        this.state.names.filter(n => n.length === 0).length > 0
      ) {
        errors.names =
          this.state.names.length <= 1
            ? 'Du måste säga vem du är!'
            : 'Ni måste säga vilka ni är!'
      }
      if (this.state.attending === 'not specified') {
        errors.attending = `Kommer ${you} eller inte?`
      } else if (this.state.attending === 'ja') {
        if (this.state.staying === undefined) {
          errors.staying = `Vi behöver veta om ${you} vill sova på Granhedsgården!`
        }
      }
      this.setState({ errors }, callback)
    }
  }

  submit() {
    this.setState(
      { submitted: true },
      this.validate(() => {
        if (Object.values(this.state.errors).join('').length === 0) {
          const { names, attending, staying, foods } = this.state
          this.props.submit({ names, attending, staying, foods })
        }
      })
    )
  }

  render() {
    const props = {
      ...this.props,
      ...this.state
    }
    const multi = props.names.length >= 2
    const you = !multi ? 'du' : 'ni'
    const ime = !multi ? 'jag' : 'vi'
    const showAttending = props.attending === 'ja'
    const showNotAttending = props.attending === 'nej'
    const showSubmit = showAttending || showNotAttending

    const names = [...props.names.keys()].map(k => (
      <div className="name-line" key={`name_${k}`}>
        <NameInput name={props.names[k]} onChange={this.updateName(k)} />
        {k > 0 ? (
          <span className="remove-one" onClick={this.remove(k)}>
            <i className="fa fa-minus-square" />
          </span>
        ) : null}
      </div>
    ))

    return (
      <div>
        <Form>
          <div className="form-control">
            <label>
              <div
                className={`validation ${!!props.errors.names ? 'error' : ''}`}
              >
                {props.errors.names}
              </div>
              {`Vad heter ${you}?`}
              <div className="names">
                {names}
                <div className="name-line">
                  <span className="add-one" onClick={this.addOne}>
                    <i className="fa fa-plus-square" />
                  </span>
                </div>
              </div>
            </label>
          </div>

          <RadioGroup
            label={`Kommer ${you}?`}
            name="rsvp"
            error={props.errors.attending}
            options={[
              { value: 'ja', text: `Klart ${ime} gör!` },
              { value: 'nej', text: `Nej, ${ime} kan inte :(` }
            ]}
            onSelect={this.setAttending}
            selected={props.attending}
          />

          <TransitionGroup component="rsvp" className="rsvp">
            <CSSTransition
              key={`attending_${props.attending}`}
              classNames={{
                appear: 'fade-appear',
                enter: 'fade-enter',
                enterActive: 'fade-enter-active',
                appearActive: 'fade-appear-active'
              }}
              timeout={timeout}
            >
              <div>
                {showAttending && (
                  <div>
                    <p>Hurra, vad roligt!</p>
                    <p>Då behöver vi veta lite mer:</p>
                    <TextArea
                      name="food"
                      label={`Har ${
                        multi ? 'ni' : 'du'
                      } några specialmatsbehov?`}
                      onChange={this.setFoods}
                    />
                    <RadioGroup
                      label={`Vill ${
                        props.multi ? 'ni' : 'du'
                      } bo på Granhedsgården natten 1-2 september?`}
                      error={props.errors.staying}
                      onSelect={this.setStaying}
                      options={[
                        { value: 'ja', text: 'Ja, gärna!' },
                        {
                          value: 'nej',
                          text: 'Nej, vi sover någon annanstans.'
                        }
                      ]}
                    />
                  </div>
                )}
                {showNotAttending && (
                  <div>
                    <p>
                      Vad tråkigt! Vi kommer sakna {multi ? 'er' : 'dig'}. Men
                      vi hoppas att vi ses nån annan gång!
                    </p>
                  </div>
                )}
                {showSubmit && (
                  <SubmitButton
                    text="Svara"
                    onClick={this.submit}
                    disabled={Object.values(props.errors).join('').length > 0}
                  />
                )}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </Form>
      </div>
    )
  }
}

const stateToProps = state => ({
  rsvpFormState: state.rsvpFormState
})
const dispatchToProps = dispatch => ({
  submit: postRsvp(dispatch)
})

export default connect(stateToProps, dispatchToProps)(RsvpForm)
