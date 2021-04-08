import React from 'react'
import { FieldError } from '../../common'
import SelectField, { ISelectFieldOption, SelectFieldConfig } from '../common'

export interface SelectMultipleFieldConfig extends SelectFieldConfig {
  type: 'select_multiple'
  mode?: 'dropdown' | 'checkbox'
  multiple?: true | SelectMultipleArrayConfig | SelectMultipleSplitConfig
}

interface SelectMultipleArrayConfig {
  type: 'array'
}

interface SelectMultipleSplitConfig {
  type: 'split',
  split?: string
}

export interface ISelectMultipleField {
  value: undefined | Array<string | number>,
  options: Array<ISelectFieldOption>
  onChange: (value: Array<string | number>) => Promise<void>
}

export default class SelectMultipleField extends SelectField<SelectMultipleFieldConfig, {}, string | Array<string | number> | undefined> {
  reset = async () => {
    const {
      config: {
        multiple
      }
    } = this.props

    const defaults = await this.defaultValue()

    if (defaults === undefined) {
      if (multiple === true || multiple?.type === 'array') {
        return []
      } else if (multiple?.type === 'split') {
        return ''
      }
    } else {
      if (multiple === true || multiple?.type === 'array') {
        if (Array.isArray(defaults)) {
          return defaults.filter((v) => typeof v === 'string' || typeof v === 'number')
        } else {
          return []
        }
      } else if (multiple?.type === 'split') {
        return String(defaults)
      }
    }

    return undefined
  }

  validate = async (_value: string | Array<string | number> | undefined): Promise<true | FieldError[]> => {
    const {
      config: {
        required
      }
    } = this.props

    const errors: FieldError[] = []

    if (required) {
      if (_value === '' || _value === undefined) {
        errors.push(new FieldError('不能为空'))
      }
    }

    return errors.length ? errors : true
  }

  renderDorpdownComponent = (props: ISelectMultipleField) => {
    return <React.Fragment>
      您当前使用的UI版本没有实现SelectMultipleField组件的SelectMultiple模式。
      <div style={{ display: 'none' }}>
        <button onClick={() => props.onChange(['onChange'])}>onChange</button>
      </div>
    </React.Fragment>
  }

  renderCheckboxComponent = (props: ISelectMultipleField) => {
    return <React.Fragment>
      您当前使用的UI版本没有实现SelectMultipleField组件的Checkbox模式。
      <div style={{ display: 'none' }}>
        <button onClick={() => props.onChange(['onChange'])}>onChange</button>
      </div>
    </React.Fragment>
  }

  render = () => {
    const {
      value,
      config: {
        mode = 'dropdown',
        multiple,
        options: optionsConfig
      },
      onChange,
      record,
      data,
      step
    } = this.props

    const props: ISelectMultipleField = {
      value: undefined,
      options: this.options(optionsConfig, { record, data, step }),
      onChange: async (value) => { await onChange(value) }
    }

    if (multiple === true || multiple?.type === 'array') {
      if (Array.isArray(value)) {
        props.value = (value as Array<string | number>)
      } else if (value !== undefined) {
        props.value = undefined
        console.warn('数组类型的多项选择框的值需要是字符串或数值的数组。')
      }
    } else if (multiple?.type === 'split') {
      if (typeof value === 'string') {
        props.value = String(value).split(multiple.split || ',')
      } else if (value !== undefined) {
        props.value = undefined
        console.warn('字符串分隔类型的多项选择框的值需要是字符串。')
      }
    }

    if (props.value !== undefined) {
      props.value = props.value.filter((v) => {
        if (props.options.map((option) => option.value).includes(v)) {
          return true
        } else {
          console.warn(`选择框的当前值中${v}不在选项中。`)
          return false
        }
      })
    }

    if (mode === 'checkbox') {
      return this.renderCheckboxComponent(props)
    } else {
      return this.renderDorpdownComponent(props)
    }
  }
}