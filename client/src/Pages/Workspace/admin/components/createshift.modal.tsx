import React, { useState } from "react";
import DatePickerComponent from "../../../../Components/datepicker.component";

interface CreateShiftModalProps {
  showModal: boolean;
  onCloseModal: () => void;
  onCreateShift: (shiftDate: Date | null, startTime: string, endTime: string) => void;
}

const CreateShiftModal: React.FC<CreateShiftModalProps> = ({
  showModal,
  onCloseModal,
  onCreateShift
}) => {
  const [shiftDate, setShiftDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleShiftDateChange = (date: Date | null) => {
    setShiftDate(date);
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleCreateShift = () => {
    onCreateShift(shiftDate, startTime, endTime);
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="relative bg-white w-1/2 p-4 rounded-md">
            <h2 className="text-lg font-bold mb-4">Create Shift</h2>
            <div className="mb-4">
              <label htmlFor="shift-date" className="block mb-1">
                Date:
              </label>
              <DatePickerComponent
                selectedDate={shiftDate}
                setSelectedDate={handleShiftDateChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="start-time" className="block mb-1">
                Start Time:
              </label>
              <input
                type="text"
                id="start-time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="end-time" className="block mb-1">
                End Time:
              </label>
              <input
                type="text"
                id="end-time"
                value={endTime}
                onChange={handleEndTimeChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
                onClick={onCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 ml-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={handleCreateShift}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default CreateShiftModal;
