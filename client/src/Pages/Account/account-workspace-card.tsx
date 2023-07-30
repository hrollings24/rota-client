import React from 'react';

export interface WorkspaceAccountCardComponentProps {
  name: string;
  workspaceId: string;
  isInvite: boolean;
}

const WorkspaceCard = ({ workspace }: { workspace: WorkspaceAccountCardComponentProps }) => {
  const handleLeaveClick = () => {
    // Add the logic to handle leaving the workspace here
    console.log(`Leaving workspace: ${workspace.name}`);
  };

  const handleJoinClick = () => {
    // Add the logic to handle joining the workspace here
    console.log(`Joining workspace: ${workspace.name}`);
  };

  const handleDeclineClick = () => {
    // Add the logic to handle declining the workspace invitation here
    console.log(`Declining workspace invitation: ${workspace.name}`);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md p-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">{workspace.name}</h3>
        {/* Add more information or components related to the workspace */}
      </div>
      {workspace.isInvite ? (
        <div>
          <button
            onClick={handleJoinClick}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2"
          >
            Join
          </button>
          <button
            onClick={handleDeclineClick}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Decline
          </button>
        </div>
      ) : (
        <button
          onClick={handleLeaveClick}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Leave
        </button>
      )}
    </div>
  );
};

export default WorkspaceCard;
