import React, { useEffect, useState } from "react";
import { WorkspaceResponse } from "../../../Types/Workspace";
import { useLocation } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import CreateShiftModal from "./components/createshift.modal";
import ShiftCard from "./shift.card";
import { set } from "date-fns";

const GET_SHIFTS_FOR_DEPARTMENT_QUERY = gql`
  query GetShiftsForDepartment($departmentId: UUID!, $startTime: DateTime!, $endTime: DateTime!) {
    shiftsForDepartment(
      request: { departmentId: $departmentId }
      where: {
        shiftStartTime: { gte: $startTime, lt: $endTime }
      }
    ) {
      id
      shiftStartTime
      shiftEndTime
    }
  }
`;


const CREATE_SHIFT_MUTATION = gql`
  mutation CreateShift($shiftEndTime: String!, $shiftStartTime: String!, $departmentId: UUID!) {
    createShift(request: { shiftEndTime: $shiftEndTime, shiftStartTime: $shiftStartTime, departmentId: $departmentId }) {
      shiftStartTime
      departmentId
      assignedToAccountId
      shiftEndTime
    }
  }
`;

export interface ShiftResponse {
  id: string;
  departmentId: string;
  shiftStartTime: string;
  shiftEndTime: string;
  assignedToAccountId: string;
}

export interface ParsedShiftResponse {
  id: string;
  departmentId: string;
  shiftStartTime: Date;
  shiftEndTime: Date;
  assignedToAccountId: string;
}

export const DepartmentAdminPage: React.FC<{ workspace: WorkspaceResponse }> = ({ workspace }) => {
  const handleGoBack = () => {
    window.history.back();
  };

  const location = useLocation();
  const match = location.pathname.match(/\/department\/([^/]+)/);
  const departmentId = match ? match[1].toLowerCase() : null;

  const [shifts, setShifts] = useState([] as ParsedShiftResponse[]);
  const [showModal, setShowModal] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  
  const [createShift, { loading: createShiftLoading }] = useMutation(CREATE_SHIFT_MUTATION);

  const increaseDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };
  
  const decreaseDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const [getShiftsForDepartment, { loading, data }] = useLazyQuery(
    GET_SHIFTS_FOR_DEPARTMENT_QUERY,
    {
      context: {
        headers: {
          WorkspaceId: workspace.workspace.id,
        },
      },
    }
  );

  const mapShiftResponseToParsedShiftResponse = (shifts: ShiftResponse[]): ParsedShiftResponse[] => {
    return shifts.map((shift) => ({
      id: shift.id,
      departmentId: shift.departmentId,
      shiftStartTime: new Date(shift.shiftStartTime),
      shiftEndTime: new Date(shift.shiftEndTime),
      assignedToAccountId: shift.assignedToAccountId,
    }));
  };

  useEffect(() => {
    console.log(departmentId)
    if (departmentId) {
      var endDate = new Date(selectedDate);
      endDate.setHours(23, 59, 59, 999); // Set time to 11:59 PM
  
      getShiftsForDepartment({
        variables: {
          departmentId: departmentId,
          startTime: selectedDate.toISOString(), // Start time (midnight)
          endTime: endDate.toISOString(), // End time (11:59 PM)
        },
      });
    }
  }, [departmentId, selectedDate, getShiftsForDepartment]);

  useEffect(() => {
    if (data) {
      setShifts(mapShiftResponseToParsedShiftResponse(data.shiftsForDepartment));
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const department = workspace.workspace.departments.find(
    (dep) => dep.id.toLowerCase() === departmentId
  );

  if (!department) {
    return <div>Department not found</div>;
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateShift = async (shiftDate: Date | null, startTime: string, endTime: string) => {
    try {
      const formattedEndTime = new Date(endTime).toISOString();
      const formattedStartTime = new Date(startTime).toISOString();

      await createShift({
        variables: {
          shiftEndTime: formattedEndTime,
          shiftStartTime: formattedStartTime,
          departmentId: departmentId
        },
        context: {
          headers: {
            WorkspaceId: workspace.workspace.id
          }
        }
      });

      // Handle success scenario
    } catch (error) {
      // Handle error scenario
    }

    closeModal();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="font-bold text-white text-3xl mb-8 flex items-center">
        <button
          className="mr-2 p-1 rounded hover:bg-gray-200"
          onClick={handleGoBack}
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-300" />
        </button>
        {department.name}
      </h1>
      <h2 className="font-bold text-white text-2xl mb-4">Shifts</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button
            className="mr-2 p-1 rounded hover:bg-gray-200"
            onClick={decreaseDate}
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-300" />
          </button>
          <p className="text-white">{selectedDate.toLocaleDateString()}</p>
          <button
            className="ml-2 p-1 rounded hover:bg-gray-200"
            onClick={increaseDate}
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-300" />
          </button>
        </div>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
          onClick={openModal}
        >
          Create Shift
        </button>
      </div>
      {shifts.length === 0 ? (
        <p>No shifts available.</p>
      ) : (
        <div>
          {shifts.map((shift) => (
            <ShiftCard key={shift.id} shift={shift} />
          ))}
        </div>
      )}
      <CreateShiftModal showModal={showModal} onCloseModal={closeModal} onCreateShift={handleCreateShift} />
    </div>
  );
};