import React from "react";
import { ImportSubformField } from 'ccms';
import { IImportSubformField, ImportSubformFieldConfig } from "ccms/dist/src/components/formFields/importSubform";
import { IFormItem } from "ccms/dist/src/steps/form";
import { Form } from "antd"
import { FormItemProps } from "antd/lib/form";
import getALLComponents from '../'

export const PropsType = (props: ImportSubformFieldConfig) => { };

export default class ImportSubformFieldComponent extends ImportSubformField {
  getALLComponents = (type: any) => getALLComponents[type]

  renderComponent = (props: IImportSubformField) => {
    const {
      children
    } = props
    return (
      <div>
        {children}
      </div>
    )
  }

  renderItemComponent = (props: IFormItem) => {
    const {
      label,
      message,
      fieldType,
      children
    } = props

    const formItemLayout: FormItemProps = { labelAlign: 'left' }
    if (fieldType === 'form' || fieldType === 'import_subform') {
      formItemLayout.labelCol = { span: 24 }
      formItemLayout.wrapperCol = { span: 24 }
    } else {
      formItemLayout.labelCol = { span: 6 }
      formItemLayout.wrapperCol = { span: 18 }
    }

    return (
      <Form.Item
        label={label}
        {...formItemLayout}
        validateStatus={status === 'normal' ? undefined : status === 'error' ? 'error' : 'validating'}
        help={fieldType === 'import_subform' ? null : message}
      >
        {children}
      </Form.Item>
    )
  }
}