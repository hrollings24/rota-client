import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_WORKSPACES_FILTER, WorkspaceResponse } from "../../../../Types/Workspace";
import { useState } from "react";

const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($name: String!) {
    createDepartment(request: { name: $name }) {
      id
      name
    }
  }
`;

interface DepartmentModalComponentProps {
    workspace: WorkspaceResponse;
    setShowCreateDepartmentModal: React.Dispatch<React.SetStateAction<any>>;
  }

export default function DepartmentModalComponent(props: DepartmentModalComponentProps)
{
    const [newDepartmentName, setNewDepartmentName] = useState("");

    const [createDepartment, { loading: createDepartmentLoading }] = useMutation(CREATE_DEPARTMENT);


  const handleCreateDepartment = async () => {
    try {
      await createDepartment({
        variables: {
          workspaceId: props.workspace.workspace.id,
          name: newDepartmentName,
        },
        context: {
            headers: {
                WorkspaceId: props.workspace.workspace.id,
                },
            },
      });

      // Refetch the data after the mutation is completed
      workspaceQueryRefetch();
      props.setShowCreateDepartmentModal(false);
      setNewDepartmentName("");
    } catch (error) {
      // Handle the error
      console.error('Error creating department:', error);
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
            <div>
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Create Department</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Department Name</label>
                  <input
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    type="text"
                    value={newDepartmentName}
                    onChange={(e) => setNewDepartmentName(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none mr-2"
                    onClick={handleCreateDepartment}
                  >
                    Create
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                    onClick={() => {
                        props.setShowCreateDepartmentModal(false);
                        setNewDepartmentName("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            </div>
    )
}
