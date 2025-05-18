import { ru } from 'date-fns/locale'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DeadLinePicker = ({ deadline, handleChange }) => {
	return (
		<>
			<DatePicker
				className='datepicker'
				selected={deadline}
				onChange={handleChange}
				showTimeSelect
				dateFormat='Pp'
				timeFormat='HH:mm'
				timeIntervals={15}
				locale={ru}
			/>
		</>
	)
}
export default DeadLinePicker
