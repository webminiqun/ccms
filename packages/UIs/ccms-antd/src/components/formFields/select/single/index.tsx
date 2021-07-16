import React from 'react'
import { SelectSingleField } from 'ccms'
import { ISelectSingleField, SelectSingleFieldConfig } from 'ccms/dist/src/components/formFields/select/single'
import { Radio, Select } from 'antd'
import 'antd/lib/select/style/index.css'
import 'antd/lib/radio/style/index.css'

export const SinglePropsType = (props: SelectSingleFieldConfig) => { }

export default class SelectSingleFieldComponent extends SelectSingleField {
  renderDorpdownComponent = (props: ISelectSingleField) => {
    const {
      value,
      options,
      onChange,
      disabled
    } = props

    return (
      <Select
        disabled={disabled}
        value={value}
        onChange={(value) => onChange(value)}
        dropdownMatchSelectWidth={false}
        style={{ minWidth: '100px' }}
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
        ))}
      </Select>
    )
  }

  renderRadioComponent = (props: ISelectSingleField) => {
    const {
      value,
      options,
      onChange,
      disabled
    } = props

    return (
      <Radio.Group
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={options}
      />
    )
  }

  renderButtonComponent = (props: ISelectSingleField) => {
    const {
      value,
      options,
      onChange,
      disabled
    } = props

    return (
      <Radio.Group
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={options}
        optionType='button'
      />
    )
  }
}
