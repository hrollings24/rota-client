import React, { useContext } from 'react';
import { gql, useMutation } from "@apollo/client";
import { AccountContext } from '../../AccountContext';

const DECLINE_INVITE_MUTATION = gql`
  mutation DeclineInviteRequest($inviteId: UUID!) {
    declineInvite(inviteId: $inviteId)
  }
`;

const ACCEPT_INVITE_MUTATION = gql`
  mutation AcceptInviteRequest($inviteId: UUID!) {
    acceptInvite(inviteId: $inviteId)
  }
`;

export interface WorkspaceAccountCardComponentProps {
  name: string;
  workspaceId: string;
  isInvite: boolean;
  inviteId: string | undefined;
}

const WorkspaceCard = ({ workspace }: { workspace: WorkspaceAccountCardComponentProps }) => {
  const [declineInviteMutation, { loading: declineInviteLoading }] = useMutation(DECLINE_INVITE_MUTATION);
  const [acceptInviteMutation, { loading: acceptInviteLoading }] = useMutation(ACCEPT_INVITE_MUTATION);

  const [accountData, setAccountData, refresh] = useContext(AccountContext);

  const handleLeaveClick = () => {
    // Add the logic to handle leaving the workspace here
    console.log(`Leaving workspace: ${workspace.name}`);
  };

  const handleJoinClick = async () => {
    // Add the logic to handle declining the workspace invitation here
    if (workspace.inviteId) {
      try {
        await acceptInviteMutation({
          variables: {
            inviteId: workspace.inviteId,
          },
        });

        refresh();
        // Handle success or UI updates after declining the invitation
      } catch (error) {
        // Handle errors if any
        console.error('Error declining workspace invitation:', error);
      }
    }
  };

  const handleDeclineClick = async () => {
    // Add the logic to handle declining the workspace invitation here
    console.log(`Declining workspace invitation: ${workspace.name}`);
    if (workspace.inviteId) {
      try {
        await declineInviteMutation({
          variables: {
            inviteId: workspace.inviteId,
          },
        });

        refresh();
        // Handle success or UI updates after declining the invitation
      } catch (error) {
        // Handle errors if any
        console.error('Error declining workspace invitation:', error);
      }
    }
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
