import { useEffect, useState } from "react";
import { WorkspaceResponse } from "../../../Types/Workspace";
import { useLocation } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

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


export default function DepartmentPage({ workspace }: { workspace: WorkspaceResponse }) {
    const location = useLocation();
  
    const match = location.pathname.match(/\/department\/([^/]+)/);
    const departmentId = match ? match[1].toLowerCase() : null;
  
    const [shifts, setShifts] = useState([] as ShiftResponse[]);
  
    const [getShiftsForDepartment, { loading, data }] = useLazyQuery(GET_SHIFTS_FOR_DEPARTMENT_QUERY, {
        context: {
          headers: {
            WorkspaceId: workspace.workspace.id,
          },
        },
      });
  
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
  
    return (
        <div style={{ padding: "20px" }}>
          {shifts.length === 0 ? (
            <p>No shifts available.</p>
          ) : (
            <ul>
              {shifts.map((shift) => (
                <li key={shift.id}>{shift.id}</li>
              ))}
            </ul>
          )}
        </div>
      );
  }
  