import React, { PureComponent } from 'react'
import { Input } from 'antd'
const { TextArea } = Input;
type Props = {
  defaultValue?: string
  value: string
  readonly?: boolean
  disabled?: boolean
  placeholder?: string
  onChange: (value: string) => Promise<void>
};

export default class TextComponent extends PureComponent<Props, {}> {
  isOnComposition = false

  state = {
    flag: false,
    input: ''
  }

  handleComposition = (e: any) => {
    const { flag } = this.state
    if ('compositionend' === e.type) {
      this.isOnComposition = false
      this.handleChange(e)
    } else {
      this.isOnComposition = true
    }
    if (flag !== this.isOnComposition) {
      this.setFlag(this.isOnComposition)
    }
  }

  setFlag = (flag: boolean) => {
    this.setState({
      flag: this.isOnComposition
    })
  }

  setInput = (value: string) => {
    this.setState({
      input: value
    })
  }
  handleChange = (e: any) => {
    const { onChange } = this.props
    this.setInput(e.target.value)
    if (this.isOnComposition) return
    onChange && onChange(e.target.value)
  }

  render() {
    const { value, readonly, disabled, placeholder } = this.props
    const { flag, input } = this.state

    let Component = TextArea

    return <Component
      readOnly={readonly}
      disabled={disabled}
      placeholder={placeholder}
      value={!flag ? value : input}
      onCompositionStart={this.handleComposition}
      onCompositionUpdate={this.handleComposition}
      onCompositionEnd={this.handleComposition}
      onChange={this.handleChange}
    />
  }
}
