import React from 'react';
import { ParsedShiftResponse } from '../admin/workspace.department.page';

interface ShiftCardProps {
  shifts: ParsedShiftResponse[];
}

const ShiftCard: React.FC<ShiftCardProps> = ({ shifts }) => (
    <div>
      {shifts.map((shift) => (
        <div key={shift.id} className="mb-4 p-4 border rounded shadow-md bg-white">
          <p className="text-lg font-semibold">Shift Details</p>
          <div className="mt-2">
            <p className="font-semibold">Shift Start Time: {shift.shiftStartTime.toString()}</p>
            <p className="font-semibold">Shift End Time: {shift.shiftEndTime.toString()}</p>
          </div>
          {!isToday(shift.shiftStartTime) && (
            <div className="mt-4">
              <button className="mr-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                Request Shift Swap
              </button>
              <button className="mr-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                Propose New Time
              </button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
                Cancel Shift
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
  
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  

export default ShiftCard;
