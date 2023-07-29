import { useState } from "react";
import { WorkspaceResponse } from "../../../Types/Workspace";
import { Modal } from "./workspace.modal";
import { ApolloError, ApolloQueryResult, QueryResult, gql, useMutation, useQuery } from "@apollo/client";
import UserTableComponent from "./components/user.table.component";
import DepartmentTableComponent from "./components/department.table.component";
import DepartmentModalComponent from "./components/createdepartment.modal";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import UserSearchModal from "../../../Components/user-search-modal";

const INVITE_USER = gql`
  mutation InviteUserToWorkspace($email: String!, $workspaceId: UUID!) {
    inviteAccountToWorkspace(request: {
      email: $email
      workspaceId: $workspaceId
    }) {
      accountId
      workspaceId
    }
  }
`;

export const WorkspaceSettingsPage: React.FC<{ workspace: WorkspaceResponse }> = ({ workspace }) => {
  const [showCreateDepartmentModal, setShowCreateDepartmentModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [inviteUserToWorkspace] = useMutation(INVITE_USER);
  const [inviteError, setInviteError] = useState<string | null>(null);

  const handleDismissError = () => {
    setInviteError(null); // Clear the error message
  };


  const handleGoBack = () => {
    window.history.back();
  };

    const handleUserSelected = async (email: string) => {
    try {
      setInviteError(null); // Reset the error state before making the mutation call
      const result = await inviteUserToWorkspace({
        variables: {
          email: email,
          workspaceId: workspace.workspace.id
        },
        context: {
          headers: {
            WorkspaceId: workspace.workspace.id,
          },
        },
      });
    } catch (error) {
      console.log(error)
      if (error instanceof ApolloError) {
        console.log("true")
        // Check if the error has graphQLErrors and show the specific error message
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          const errorMessage = error.graphQLErrors[0].message;
          console.error("Error sending invitation:", errorMessage);
          setInviteError(errorMessage); // Set the specific error message in case of an error
        } else {
          console.error("Error sending invitation:", error.message);
          setInviteError("Error sending invitation. " + error.message);
        }
      }
    } finally {
      setShowUserModal(false); // Close the user search modal, whether there's an error or not
    }
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
      {inviteError && <ErrorAlert message={inviteError} onClose={handleDismissError} />}
    </div>
  );
};


interface errorProps{
  message: string,
  onClose: () => void
}

const ErrorAlert = (props: errorProps) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg flex justify-between">
      <div>{props.message}</div>
      <button onClick={props.onClose} className="text-white font-bold ml-4">
        Close
      </button>
    </div>
  );
};