import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DeadLinePicker = () => {
	const [deadline, setDeadline] = useState(new Date())

	const handleChange = date => {
		setDeadline(date)
		// onChange(date.toISOString())
	}

	return (
		<div>
			<DatePicker
				className='datepicker'
				selected={deadline}
				onChange={handleChange}
				showTimeSelect
				dateFormat='Pp'
				timeFormat='HH:mm'
				timeIntervals={15}
				locale='ru'
			/>
		</div>
	)
}
export default DeadLinePicker
