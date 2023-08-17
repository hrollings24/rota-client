import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Workspace } from "../../../Types/Workspace";
import WorkspaceUserSelectorModal from "../../../Components/workspace-user-selector-modal";
import ShiftStateText from "./components/shift.statetext";
import { ParsedShiftResponse } from "./workspace.department.page";

const ASSIGN_SHIFT_MUTATION = gql`
  mutation AssignShift($request: AssignDataInput!) {
    assignShift(request: $request) {
      id
    }
  }
`;

const UNASSIGNED_SHIFT_MUTATION = gql`
  mutation UnassignShift($request: ShiftIdRequestInput!) {
    unassignShift(request: $request) {
      id
    }
  }
`;

interface CardProps {
  shift: ParsedShiftResponse;
  workspace: Workspace;
  refreshDepartment: () => void;
}

const ShiftCard: React.FC<CardProps> = ({ shift, workspace, refreshDepartment }) => {
  const [showUserSelectorModal, setShowUserSelectorModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowUserSelectorModal(false);
  };

  const [assignShiftMutation] = useMutation(ASSIGN_SHIFT_MUTATION, {
    context: {
      headers: {
        WorkspaceId: workspace.id,
      },
    },
  });

  const [unassignShiftMutation] = useMutation(UNASSIGNED_SHIFT_MUTATION, {
    context: {
      headers: {
        WorkspaceId: workspace.id,
      },
    },
  });

  const handleSubmitModal = async (accountId: string) => {
    try {
      // Call the mutation to assign the user to the shift
      await assignShiftMutation({
        variables: { request: { shiftId: shift.id, accountId } },
      });

      // Close the modal after successful assignment (optional)
      handleCloseModal();

      console.log("going to refresh...");
      // Refetch the shifts data to get the latest changes
      refreshDepartment();
    } catch (error) {
      // Handle any errors that occur during the mutation
      console.error('Error assigning user to shift:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleUnassignedShift = async () => {
    try {
      // Call the mutation to unassign the user from the shift
      await unassignShiftMutation({
        variables: { request: { shiftId: shift.id } },
      });

      // Refetch the shifts data to get the latest changes
      console.log("going to refresh...");
      refreshDepartment();
    } catch (error) {
      // Handle any errors that occur during the mutation
      console.error('Error unassigning user from shift:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleAssignUser = () => {
    setShowUserSelectorModal(true);
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-md p-4 mb-4 flex items-center justify-between">
        <div>
            <p className="mb-2">
              Start Time:{" "}
              {shift.shiftStartTime.toLocaleDateString() +
                " " +
                shift.shiftStartTime.toLocaleTimeString()}
            </p>
            <p className="mb-2">
              End Time:{" "}
              {shift.shiftEndTime.toLocaleDateString() +
                " " +
                shift.shiftEndTime.toLocaleTimeString()}
            </p>
            <ShiftStateText shift={shift}></ShiftStateText>
          </div>
        {shift.assignedUser ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
            onClick={handleUnassignedShift}
          >
            Unassign User
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
          onClose={handleCloseModal}
          onSubmit={handleSubmitModal}
        />
      )}
    </div>
  );
};

export default ShiftCard;
