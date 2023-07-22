import React, { useState } from "react";
import { ParsedShiftResponse } from "./workspace.department.page";
import { Workspace } from "../../../Types/Workspace";
import WorkspaceUserSelectorModal from "../../../Components/workspace-user-selector-modal";
import ShiftStateText from "./components/shift.statetext";

interface CardProps {
  shift: ParsedShiftResponse;
  workspace: Workspace;
}

const ShiftCard: React.FC<CardProps> = ({ shift, workspace }) => {
    const [showUserSelectorModal, setShowUserSelectorModal] = useState<boolean>(false);


    const handleCloseModal = () => {
        setShowUserSelectorModal(false);
      };

  const handleAssignUser = () => {
    // Handle assign user logic
    console.log("Assigning user to shift:", shift.id);
    setShowUserSelectorModal(true)
  };

  const handleRemoveUser = () => {
    // Handle remove user logic
    console.log("Removing user from shift:", shift.id);
  };

  return (
    <div>
        <div className="bg-white shadow-md rounded-md p-4 mb-4 flex items-center justify-between">
            <div>
                <p>Start Time: {shift.shiftStartTime.toLocaleDateString() + " " + shift.shiftStartTime.toLocaleTimeString()}</p>
                <p>End Time: {shift.shiftEndTime.toLocaleDateString() + " " + shift.shiftEndTime.toLocaleTimeString()}</p>
                <ShiftStateText shift={shift}></ShiftStateText>
            </div>
            {shift.assignedToAccountId ? (
                <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                onClick={handleRemoveUser}
                >
                Remove User
                </button>
            ) : (
                <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                onClick={handleAssignUser}
                >
                Assign User
                </button>
            )}
            </div>
{showUserSelectorModal && (
        <WorkspaceUserSelectorModal
          users={workspace.users}
          onClose={handleCloseModal} // Pass a callback to handle modal close
        />
    )}    
        </div>
  );
};

export default ShiftCard;
