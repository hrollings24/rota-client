import { useState } from "react";
import { WorkspaceResponse } from "../../../Types/Workspace";
import { Modal } from "./workspace.modal";
import { ApolloQueryResult, QueryResult, gql, useMutation, useQuery } from "@apollo/client";
import UserTableComponent from "./components/user.table.component";
import DepartmentTableComponent from "./components/department.table.component";
import DepartmentModalComponent from "./components/createdepartment.modal";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import UserSearchModal from "../../../Components/user-search-modal";

export const WorkspaceSettingsPage: React.FC<{ workspace: WorkspaceResponse }> = ({ workspace }) => {
  const [showCreateDepartmentModal, setShowCreateDepartmentModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleUserSelected = (email: string) => {
    console.log(email)
  }

  const departments = workspace.workspace.departments;

  return (
    <div className="p-6">
      <h1 className="font-bold text-white text-3xl mb-8 flex items-center">
        <button className="mr-2 p-1 rounded hover:bg-gray-200" onClick={handleGoBack}>
          <ChevronLeftIcon className="h-6 w-6 text-gray-300" />
        </button>
        Settings
      </h1>
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
  
      <div style={{ marginBottom: "20px" }}></div>
  
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-white text-2xl">Users</h2>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
          onClick={() => setShowUserModal(true)}
          style={{ padding: "8px 16px" }}
        >
          Invite User
        </button>
      </div>
      <UserTableComponent workspace={workspace.workspace} />
      {showCreateDepartmentModal && (
        <DepartmentModalComponent
          workspace={workspace}
          setShowCreateDepartmentModal={setShowCreateDepartmentModal}
        />
      )}
      {showUserModal && (
        <UserSearchModal
          setShowModal={setShowUserModal}
          action={handleUserSelected}
        />
      )}
    </div>
  );
};
