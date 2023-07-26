import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

interface UserModalProps {
    action: (email: string) => void;
    setShowModal: React.Dispatch<React.SetStateAction<any>>;
  }

  export default function UserSearchModal(props: UserModalProps) {
    const [userEmail, setUserEmail] = useState("");
  
    return (
      <div>
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96"> {/* Increase width here */}
            <h2 className="text-xl font-bold mb-4">Invite User</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                type="text"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none mr-2"
                onClick={() => props.action(userEmail)}
              >
                Invite
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                onClick={() => {
                  props.setShowModal(false);
                  setUserEmail("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }