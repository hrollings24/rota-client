import { useEffect } from "react";
import { WorkspaceResponse } from "../../Types/Workspace";
import Card from "../Home/Components/card-component";


export default function WorkspaceHomePage({ workspace }: { workspace: WorkspaceResponse }) {

    useEffect(() => {
        console.log(workspace);
    }, []);

    console.log(workspace);

    const renderRow = () => {
        return (
          <div className="pt-6">
            {workspace.workspace.departments.map((entry) => (
              <div key={entry.id} className="mb-6">
                <Card title={entry.name} description="test" url={entry.id} />
              </div>
            ))}
          </div>
        );
      };


    return (
        <div style={{ padding: "20px" }}>
          <h1 style={{ fontWeight: "bold", color: "white" }}>Departments</h1>
          {renderRow()}
        </div>
      );
}