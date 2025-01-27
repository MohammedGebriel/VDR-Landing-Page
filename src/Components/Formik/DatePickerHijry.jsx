import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMomentHijri } from '@mui/x-date-pickers/AdapterMomentHijri'
import { useFormikContext } from 'formik'
import moment from 'moment-hijri'

export default function DatePickerHijry({ name, label }) {
  const { setFieldValue } = useFormikContext()

  return (
    <LocalizationProvider dateAdapter={AdapterMomentHijri}>
      <label>
      {label}
      </label>
      <DatePicker
        className='bg-white rounded-[10px]'
        name={name}
        onChange={newValue => setFieldValue(name, newValue ? moment(newValue).format('iYYYY-iMM-iDD') : '')}
        minDate={moment(new Date(1938, 0, 1))}
        maxDate={moment(new Date(2075, 11, 31))}
      />
    </LocalizationProvider>
  )
}
