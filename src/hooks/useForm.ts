import { useCallback, useState } from 'react'

interface FormDataType {
  [key: string]: FieldValue
}

interface FieldValue {
  value?: any
  error?: boolean
}

type ValueObj = { [key: string]: any }

export default function useForm<T extends ValueObj>() {
  const [formData, setFormData] = useState<FormDataType>({})

  const getFieldNames = useCallback(() => {
    return Object.keys(formData)
  }, [formData])

  function getFormData() {
    return formData
  }

  function getFieldValues(field?: keyof T) {
    if (field) {
      return formData?.field?.value
    }

    const fields = getFieldNames()
    const values: ValueObj = fields.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: formData[curr].value,
      }),
      {}
    )

    return values
  }

  function setFields(formData: FormDataType) {
    setFormData((prev) => ({
      ...prev,
      ...formData,
    }))
  }

  function setFieldsValue(fieldValues: ValueObj) {
    console.log(fieldValues)

    setFormData((prev) => {
      const fields = Object.keys(fieldValues)
      const updated: FormDataType = { ...prev }
      fields.forEach((field) => {
        updated[field] = {
          ...updated[field],
          value: fieldValues[field],
        }
      })

      return updated
    })
  }

  return {
    getFieldNames,
    getFormData,
    getFieldValues,
    setFields,
    setFieldsValue,
  }
}
