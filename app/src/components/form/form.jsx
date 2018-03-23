import React from 'react'
import PropTypes from 'prop-types'
import './form.css'

export const Form = props =>
  <form
    method="post"
    action={props.action}>
    {props.children}
  </form>

// todo add submit button to form

const FormControl = props =>
  <div className={`form-control ${props.className}`}>
    {props.children}
  </div>

const CheckControl = props =>
  <FormControl className="check-control">
    <label className={props.type}>
      {props.text}
      <input
        type={props.type}
        value={props.value}
        onChange={props.onSelect}
        checked={props.selected} />
      <span className="indicator" />
    </label>
  </FormControl>

export const TextBox = props =>
  <FormControl className="text-control">
    <label className="text">
      {props.label}
      <input
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.onChange} />
    </label>
  </FormControl>

export const NumberTextBox = props =>
  <FormControl className="text-control">
    <label className="text">
      {props.label}
      <input
        name={props.name}
        type="number"
        value={props.value}
        onChange={props.onChange} />
    </label>
  </FormControl>

export const TextArea = props =>
  <FormControl className="text-control">
    <label className="text">
      {props.label}
      <textarea
        name={props.name}
        onChange={props.onChange}>{props.value}</textarea>
    </label>
  </FormControl>

export const RadioButton = props => <CheckControl type="radio" {...props} />

export class RadioGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: props.selected }
    this.selectItem = this.selectItem.bind(this)
  }

  selectItem(event) {
    this.setState({ selected: event.target.value })
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(event.target.value)
    }
  }

  render() {
    const option = o =>
      <RadioButton
        key={this.props.name + "-" + o.value}
        name={this.props.name}
        {...o}
        selected={o.value == this.state.selected}
        onSelect={this.selectItem} />

    return <div>
      <div className={`validation ${!!this.props.error ? 'error' : ''}`}>{this.props.error}</div>
      {this.props.label}
      {this.props.options.map(option)}
    </div>
  }
}

export const Button = props =>
  <button className={props.className} onClick={e => {
    props.action && props.action();
    e.preventDefault();
    e.stopPropagation();
  }}>
    {props.children}</button>

export class SubmitButton extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }
  submit(e) {
    e.preventDefault()
    e.stopPropagation()
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return this.props.disabled
      ? <input type="submit" value={this.props.text} disabled="disabled" />
      : <input type="submit" value={this.props.text} onClick={this.submit} />
  }
}
