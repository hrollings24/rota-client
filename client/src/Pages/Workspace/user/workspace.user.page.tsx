import { gql, useLazyQuery } from "@apollo/client";
import { WorkspaceResponse } from "../../../Types/Workspace";
import { auth } from "../../../firebaseSetup";
import { useEffect, useState } from "react";
import { ParsedShiftResponse, ShiftResponse } from "../admin/workspace.department.page";

export const GET_SHIFTS_QUERY = gql`
  query GetShiftsForDepartment($filters: ShiftFilterInput!) {
    shifts(filters: $filters) {
      id
      shiftStartTime
      shiftEndTime
      state
      departmentId
      assignedUser {
        firstName
        surname
        accountId
      }
    }
  }
`;

export default function WorkspaceUserPage({ workspace }: { workspace: WorkspaceResponse }) {

  const [shifts, setShifts] = useState([] as ParsedShiftResponse[]);
  const [tomorrowShifts, setTomorrowShifts] = useState([] as ParsedShiftResponse[]);
  const [loading, setLoading] = useState(false);

  const mapShiftResponseToParsedShiftResponse = (shifts: ShiftResponse[]): ParsedShiftResponse[] => {
    return shifts.map((shift) => ({
      id: shift.id,
      departmentId: shift.departmentId,
      shiftStartTime: new Date(shift.shiftStartTime),
      shiftEndTime: new Date(shift.shiftEndTime),
      assignedUser: shift.assignedUser,
      state: shift.state
    }));
  };

  const [getShifts, { data }] = useLazyQuery(
    GET_SHIFTS_QUERY,
    {
      fetchPolicy: "no-cache",      
      context: {
        headers: {
          WorkspaceId: workspace.workspace.id,
        },
      },
    }
  );

  const getShiftsForTodayAndTomorrow = () => {
    setLoading(true);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Get the next day
    tomorrow.setHours(0, 0, 0, 0); // Set time to midnight

    const endDate = new Date(tomorrow);
    endDate.setHours(23, 59, 59, 999); // Set time to 11:59 PM of tomorrow

    getShifts({
      variables: {
        filters: {
          assignedToAccountId: auth.currentUser?.uid,
          earliestStartDate: today.toISOString(), // Start time (midnight of today)
          latestStartDate: endDate.toISOString(), // End time (11:59 PM of tomorrow)
        },
      },
    });
  };

  useEffect(() => {
    getShiftsForTodayAndTomorrow();
  }, []);

  useEffect(() => {
    if (data && data.shifts) {
      const allShifts = mapShiftResponseToParsedShiftResponse(data.shifts);
      const todayShifts = allShifts.filter((shift) => isToday(shift.shiftStartTime));
      const tomorrowShifts = allShifts.filter((shift) => isTomorrow(shift.shiftStartTime));

      setShifts(todayShifts);
      setTomorrowShifts(tomorrowShifts);
      setLoading(false);
    }
  }, [data]);

  const isToday = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight

    const endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999); // Set time to 11:59 PM

    return date >= today && date <= endDate;
  };

  const isTomorrow = (date: Date): boolean => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Get the next day
    tomorrow.setHours(0, 0, 0, 0); // Set time to midnight

    const endDate = new Date(tomorrow);
    endDate.setHours(23, 59, 59, 999); // Set time to 11:59 PM of tomorrow

    return date >= tomorrow && date <= endDate;
  };

  return (
    <div className="p-8">
      {/* Today view */}
      <h1 className="font-bold text-white text-2xl mb-4">Today</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : shifts.length === 0 ? (
        <p className="text-gray-500">No shifts assigned for today.</p>
      ) : (
        <div>
          {shifts.map((shift) => (
            <div key={shift.id} className="mb-4 border-b pb-2">
              <p className="font-semibold">Shift Start Time: {shift.shiftStartTime.toString()}</p>
              <p className="font-semibold">Shift End Time: {shift.shiftEndTime.toString()}</p>
              {shift.assignedUser && (
                <>
                  <p>Assigned User: {shift.assignedUser.firstName} {shift.assignedUser.surname}</p>
                  <p>Assigned User Account ID: {shift.assignedUser.accountId}</p>
                </>
              )}
              <p>Department ID: {shift.departmentId}</p>
              <p>State: {shift.state}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tomorrow view */}
      <h1 className="font-bold text-white text-2xl mt-8 mb-4">Tomorrow</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : tomorrowShifts.length === 0 ? (
        <p className="text-gray-500">No shifts assigned for tomorrow.</p>
      ) : (
        <div>
          {tomorrowShifts.map((shift) => (
            <div key={shift.id} className="mb-4 border-b pb-2">
              <p className="font-semibold">Shift Start Time: {shift.shiftStartTime.toString()}</p>
              <p className="font-semibold">Shift End Time: {shift.shiftEndTime.toString()}</p>
              {shift.assignedUser && (
                <>
                  <p>Assigned User: {shift.assignedUser.firstName} {shift.assignedUser.surname}</p>
                  <p>Assigned User Account ID: {shift.assignedUser.accountId}</p>
                </>
              )}
              <p>Department ID: {shift.departmentId}</p>
              <p>State: {shift.state}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}