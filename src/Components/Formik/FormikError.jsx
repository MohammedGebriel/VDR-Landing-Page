/* eslint-disable react/prop-types */
import { useFormikContext } from "formik"
import { createElement } from "react"
import { twMerge } from "tailwind-merge"

 const FormikError = ({
  name,
  as = "p",
  className,
  withTouched = true,
}) => {
  const { errors: formikErrors, touched: formikTouched } = useFormikContext()

  const error = formikErrors[name]
  const isTouched = formikTouched[name]

return (withTouched ? !!error && isTouched : !!error)

    ? createElement(
        as,
        { className: twMerge(className, "text-red-500 text-[0.75rem] text-right flex lowercase") },
        error?.toString()
      )
    : null
}

export  {FormikError}
