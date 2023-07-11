import { useEffect, useState } from "react";
import { WorkspaceResponse, User, Department, GET_WORKSPACES_FILTER } from "../../../Types/Workspace";
import { Modal } from "./workspace.modal";
import { ApolloQueryResult, QueryResult, gql, useMutation, useQuery } from "@apollo/client";
import UserTableComponent from "./components/user.table.component";
import DepartmentTableComponent from "./components/department.table.component";
import DepartmentModalComponent from "./components/createdepartment.modal";

export const WorkspaceSettingsPage: React.FC<{ workspace: WorkspaceResponse }> = ({ workspace }) => {
   
  const [showCreateDepartmentModal, setShowCreateDepartmentModal] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontWeight: "bold", color: "white" }}>Settings</h1>
      <UserTableComponent workspace={workspace.workspace} />
      <h1 style={{ fontWeight: "bold", color: "white" }}>Departments</h1>
      <button
          className="fixed-width-button px-4 py-2 mt-4 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
          onClick={() => setShowCreateDepartmentModal(true)}
        >
          Add Department
        </button>
        {showCreateDepartmentModal && (<DepartmentModalComponent workspace={workspace} setShowCreateDepartmentModal={setShowCreateDepartmentModal} />)}
        <DepartmentTableComponent workspace={workspace}/>
    </div>
  );
}