import { useEffect, useState } from "react";
import { WorkspaceResponse } from "../../../Types/Workspace";
import { useLocation } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import DatePicker from "../../../Components/datepicker.component";
import CreateShiftModal from "./components/createshift.modal";
import ShiftCard from "./shift.card";

const GET_SHIFTS_FOR_DEPARTMENT_QUERY = gql`
  query GetShiftsForDepartment($departmentId: UUID!) {
    shiftsForDepartment(request: { departmentId: $departmentId }) {
      id,
      shiftStartTime,
      shiftEndTime,
      assignedToAccountId
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


export const DepartmentAdminPage: React.FC<{ workspace: WorkspaceResponse }> = ({ workspace }) => {
  const handleGoBack = () => {
    window.history.back();
  };

  const location = useLocation();
  const match = location.pathname.match(/\/department\/([^/]+)/);
  const departmentId = match ? match[1].toLowerCase() : null;

  const [shifts, setShifts] = useState([] as ShiftResponse[]);
  const [showModal, setShowModal] = useState(false);
  const [createShift, { loading: createShiftLoading }] = useMutation(CREATE_SHIFT_MUTATION);

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
      setShifts(data.shiftsForDepartment);
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
            <ShiftCard shift={shift}></ShiftCard>
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
