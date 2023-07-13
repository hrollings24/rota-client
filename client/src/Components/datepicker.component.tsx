import { useState, ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomInputProps {
  value: string;
  onClick: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => (
  <button
    className="px-4 py-2 w-40 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
    onClick={onClick}
  >
    {value}
  </button>
);

const DatePickerComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="MMMM d, yyyy"
      customInput={<CustomInput value={selectedDate?.toLocaleDateString() || ''} onClick={() => {}} />}
    />
  );
};

export default DatePickerComponent;
