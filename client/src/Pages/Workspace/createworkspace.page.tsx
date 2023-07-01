import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";



const CREATE_WORKSPACE_MUTATION = gql`
  mutation CreateWorkspace($name: String!) {
    createWorkspace(request: { name: $name }) {
      id
      name
    }
  }
`;


export default function CreateWorkspacePage() {
    const [name, setName] = useState('');
    const [createWorkspaceMutation, { loading: createWorkspaceLoading }] = useMutation(CREATE_WORKSPACE_MUTATION);
    const navigate = useNavigate();

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
          const { data } = await createWorkspaceMutation({
            variables: {
              name: name,
            },
          });
      
          setName('');
          navigate(`/workspace/${data.createWorkspace.id}`);
        } catch (error) {
          // Handle the error
          console.error('Error creating workspace:', error);
        }
    };
  
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold text-white">Create Workspace</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="nameInput" className="block mb-2 text-lg font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="nameInput"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter the name of your workspace"
            className="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 text-lg font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }