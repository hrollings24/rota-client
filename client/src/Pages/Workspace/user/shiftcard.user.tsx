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
            <p className="mt-2">Department ID: {shift.departmentId}</p>
          </div>
        </div>
      ))}
    </div>
  );

export default ShiftCard;
