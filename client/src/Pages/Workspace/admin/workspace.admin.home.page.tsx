import { useEffect } from "react";
import { WorkspaceResponse } from "../../../Types/Workspace";
import Card from "../../Home/Components/card-component";
import { useNavigate } from "react-router-dom";


export default function WorkspaceAdminHomePage({ workspace }: { workspace: WorkspaceResponse }) {
  const navigate = useNavigate();

    const renderRow = () => {
        return (
          <div className="pt-6 overflow-x-auto flex">
            {workspace.workspace.departments.map((entry) => (
              <div key={entry.id} className="mb-6 mr-4">
                <Card
                  title={entry.name}
                  description="test"
                  url={entry.id}
                  onClick={() => {}}
                  buttonText="Go To Department"
                />
              </div>
            ))}
          </div>
        );
      };
      
      return (
        <div style={{ padding: "20px" }}>
          <div className="flex justify-between items-center mb-4">
            <h1 style={{ fontWeight: "bold", color: "white" }}>Departments</h1>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none"
              onClick={() => {
                navigate("/workspace/" + workspace.workspace.id + "/settings")
              }}
            >
              Settings
            </button>
          </div>
          {renderRow()}
        </div>
      );
      
}