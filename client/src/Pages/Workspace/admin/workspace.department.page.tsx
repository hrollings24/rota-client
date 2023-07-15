import { useEffect, useState } from "react";
import { WorkspaceResponse } from "../../../Types/Workspace";
import { useLocation } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import DatePicker from "../../../Components/datepicker.component";
import CreateShiftModal from "./components/createshift.modal";

const GET_SHIFTS_FOR_DEPARTMENT_QUERY = gql`
  query GetShiftsForDepartment($departmentId: UUID!) {
    shiftsForDepartment(request: { departmentId: $departmentId }) {
      id
    }
  }
`;

export interface ShiftResponse {
    id: string;
    departmentId: string;
    startTime: string;
    endTime: string;
}


export const DepartmentAdminPage: React.FC<{ workspace: WorkspaceResponse }> = ({ workspace }) => {
  const handleGoBack = () => {
    window.history.back();
  };

  const location = useLocation();
  const match = location.pathname.match(/\/department\/([^/]+)/);
  const departmentId = match ? match[1].toLowerCase() : null;

  const [shifts, setShifts] = useState([] as ShiftResponse[]);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    if (departmentId) {
      getShiftsForDepartment({ variables: { departmentId } });
    }
  }, [departmentId, getShiftsForDepartment]);

  useEffect(() => {
    if (data) {
      setShifts(data.getShiftsForDepartment || []);
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

  const handleCreateShift = (shiftDate: Date | null, startTime: string, endTime: string) => {
    // Handle create shift logic using the provided shiftDate, startTime, and endTime
    // e.g., dispatch an action, make an API call, etc.
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-white text-2xl">Shifts</h2>
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
        <ul>
          {shifts.map((shift) => (
            <li key={shift.id}>{shift.id}</li>
          ))}
        </ul>
      )}
      <CreateShiftModal
      showModal={showModal}
      onCloseModal={closeModal}
      onCreateShift={handleCreateShift}
    />
    </div>
  );
};
