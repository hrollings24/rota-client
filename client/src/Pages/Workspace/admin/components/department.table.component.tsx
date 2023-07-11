import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_WORKSPACES_FILTER, WorkspaceResponse } from "../../../../Types/Workspace";
import { useState } from "react";

interface DepartmentTableComponentProps {
    workspace: WorkspaceResponse;
  }

export default function DepartmentTableComponent(props: DepartmentTableComponentProps)
{
    return (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {props.workspace.workspace.departments.map((department) => (
              <tr key={department.id}>
                <td className="px-6 py-4 whitespace-nowrap">{department.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}
