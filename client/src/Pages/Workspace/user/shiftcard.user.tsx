import React from 'react';
import { ParsedShiftResponse } from '../admin/workspace.department.page';
import { gql, useMutation } from '@apollo/client';
import { auth } from '../../../firebaseSetup';

interface ShiftCardProps {
  shifts: ParsedShiftResponse[];
  workspaceId: string
}

const CANCEL_SHIFT = gql`
  mutation AssignShift($shiftid: UUID!, $accountId: String!) {
    actionShift(request: {action: PROPOSE_CANCELLATION, state: PENDING_CANCELLATION, shiftId: $shiftid, accountId: $accountId}) {
        id
      }
  }
`;

const ShiftCard: React.FC<ShiftCardProps> = ({ shifts, workspaceId }) => {
    const [cancelShiftMutation] = useMutation(CANCEL_SHIFT);
  
    const handleCancelShift = (shiftId: string) => {         

      cancelShiftMutation({
        variables: {
          shiftid: shiftId,
          accountId: null,
        },
        context: {
            headers: {
              WorkspaceId: workspaceId,
            },
        }
      })
        .then((response) => {
          // Handle the response if needed
        })
        .catch((error) => {
          // Handle the error if needed
        });
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      };
  
    return (
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
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none" 
                onClick={() => handleCancelShift(shift.id)}>
                Cancel Shift
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
    );
  };

  

export default ShiftCard;
