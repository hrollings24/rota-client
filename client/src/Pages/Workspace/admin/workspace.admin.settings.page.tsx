import { useState } from "react";
import { WorkspaceResponse } from "../../../Types/Workspace";
import { Modal } from "./workspace.modal";
import { ApolloQueryResult, QueryResult, gql, useMutation, useQuery } from "@apollo/client";
import UserTableComponent from "./components/user.table.component";
import DepartmentTableComponent from "./components/department.table.component";
import DepartmentModalComponent from "./components/createdepartment.modal";

export const WorkspaceSettingsPage: React.FC<{ workspace: WorkspaceResponse }> = ({ workspace }) => {
  const [showCreateDepartmentModal, setShowCreateDepartmentModal] = useState(false);

  const departments = workspace.workspace.departments;

  return (
    <div className="p-6">
      <h1 className="font-bold text-white text-3xl mb-8">Settings</h1>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-white text-2xl">Departments</h2>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
          onClick={() => setShowCreateDepartmentModal(true)}
        >
          Add Department
        </button>
      </div>
      {departments.length > 0 ? (
        <DepartmentTableComponent workspace={workspace} />
      ) : (
        <p className="text-white">You do not have any departments</p>
      )}
      <h2 className="font-bold text-white text-2xl mt-8 mb-4">Users</h2>
      <UserTableComponent workspace={workspace.workspace} />
      {showCreateDepartmentModal && (
        <DepartmentModalComponent workspace={workspace} setShowCreateDepartmentModal={setShowCreateDepartmentModal} />
      )}
    </div>
  );
};
