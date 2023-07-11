import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_WORKSPACES_FILTER, WorkspaceResponse } from "../../../../Types/Workspace";
import { useState } from "react";

interface DepartmentTableComponentProps {
  workspace: WorkspaceResponse;
}

const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($departmentId: UUID!) {
    deleteDepartment(departmentId: $departmentId)
  }
`;

export default function DepartmentTableComponent(props: DepartmentTableComponentProps) {
  const [deleteDepartment, { loading: deleteDepartmentLoading }] = useMutation(DELETE_DEPARTMENT);

  const handleDelete = async (departmentId: string) => {
    // Display the confirmation dialog
    const shouldDelete = window.confirm("Are you sure you want to delete this department?");

    if (shouldDelete) {
      try {
        await deleteDepartment({
          variables: {
            departmentId: departmentId,
          },
          context: {
            headers: {
              WorkspaceId: props.workspace.workspace.id,
            },
          },
        });

        // Refetch the data after the mutation is completed
        workspaceQueryRefetch();
      } catch (error) {
        // Handle the error
        console.error('Error creating department:', error);
      }
    }
  };

  const { loading: workspaceQueryLoading, refetch: workspaceQueryRefetch } = useQuery(GET_WORKSPACES_FILTER, {
    context: {
      headers: {
        WorkspaceId: props.workspace.workspace.id,
      },
    },
  });

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {props.workspace.workspace.departments.map((department) => (
            <tr key={department.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {department.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(department.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
