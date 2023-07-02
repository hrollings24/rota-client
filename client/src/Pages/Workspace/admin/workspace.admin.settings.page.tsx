import { useState } from "react";
import { WorkspaceResponse, User, Department } from "../../../Types/Workspace";
import { Modal } from "./workspace.modal";

export default function WorkspaceSettingsPage({ workspace }: { workspace: WorkspaceResponse }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    
  const handleChangeRole = (user: User) => {
    // Handle change role button click
    // You can implement the logic to update the user's role here
  };

  const handleSelectDepartment = (departmentId: string) => {
    // Implement the logic to update the user's department here
    if (selectedUser) {
        console.log(departmentId)
      // Update the selected user's department
    }
  };



  const handleChangeDepartment = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const getDepartmentName = (departmentId: string): string => {
    const department = workspace.workspace.departments.find((dept) => dept.id === departmentId);
    return department ? department.name : "--";
  };

  const renderDepartmentButton = (user: User) => {
    if (user.departmentId) {
      return (
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none mr-2"
          onClick={() => handleChangeDepartment(user)}
        >
          Change Department
        </button>
      );
    } else {
      return (
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none mr-2"
          onClick={() => handleChangeDepartment(user)}
        >
          Assign Department
        </button>
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
        {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          departments={workspace.workspace.departments}
          onSelectDepartment={handleSelectDepartment}
        />
      )}
      <h1 style={{ fontWeight: "bold", color: "white" }}>Settings</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {workspace.workspace.users.map((user) => (
              <tr key={user.accountId}>
                <td className="px-6 py-4 whitespace-nowrap">{user.firstName + " " + user.surname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getDepartmentName(user.departmentId)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none mr-2"
                    onClick={() => handleChangeRole(user)}
                  >
                    Change Role
                  </button>
                  {renderDepartmentButton(user)}
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                    onClick={() => {
                      // Handle remove button click
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}