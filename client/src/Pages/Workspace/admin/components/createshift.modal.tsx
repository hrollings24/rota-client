import React, { useState } from 'react';

interface CreateShiftModalProps {
  showModal: boolean;
  currentDate: Date;
  onCloseModal: () => void;
  onCreateShift: (startTime: Date | null, endTime: Date | null) => void;
}

const CreateShiftModal: React.FC<CreateShiftModalProps> = ({ showModal, currentDate, onCloseModal, onCreateShift }) => {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const handleCreateShift = () => {
    const createDateTime = (timeString: string, addDay = false) => {
      const newDate = new Date(currentDate);
      if (addDay) {
        newDate.setDate(newDate.getDate() + 1);
      }
      const [hours, minutes] = timeString.split(':').map(Number);
      newDate.setHours(hours, minutes);
      return newDate;
    };
  
    const start = startTime ? createDateTime(startTime) : null;
    const end = startTime && endTime && endTime < startTime ? createDateTime(endTime, true) : createDateTime(endTime);
    onCreateShift(start, end);
  };
  

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="relative bg-white w-1/2 p-4 rounded-md">
            <h2 className="text-lg font-bold mb-4">Create Shift</h2>
            <div className="mb-4">
              <label htmlFor="start-time" className="block mb-1">
                Start Time:
              </label>
              <input
                type="time"
                id="start-time"
                className="px-2 py-1 border rounded-md"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="end-time" className="block mb-1">
                End Time:
              </label>
              <input
                type="time"
                id="end-time"
                className="px-2 py-1 border rounded-md"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
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
