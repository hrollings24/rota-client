import React from "react";
import { ShiftResponse } from "./workspace.department.page";

interface CardProps {
  shift: ShiftResponse;
}

const ShiftCard: React.FC<CardProps> = ({ shift }) => {
  const handleAssignUser = () => {
    // Handle assign user logic
    console.log("Assigning user to shift:", shift.id);
  };

  const handleRemoveUser = () => {
    // Handle remove user logic
    console.log("Removing user from shift:", shift.id);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <p>Start Time: {shift.shiftStartTime}</p>
      <p>End Time: {shift.shiftEndTime}</p>
      {shift.assignedToAccountId ? (
        <button
          className="px-4 py-2 mt-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
          onClick={handleRemoveUser}
        >
          Remove User
        </button>
      ) : (
        <button
          className="px-4 py-2 mt-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
          onClick={handleAssignUser}
        >
          Assign User
        </button>
      )}
    </div>
  );
};

export default ShiftCard;
