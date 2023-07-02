import { useState } from "react";
import { Department } from "../../../Types/Workspace";

interface ModalProps {
    onClose: () => void;
    departments: Department[];
    onSelectDepartment: (departmentId: string) => void;
  }
  
export const Modal: React.FC<ModalProps> = ({ onClose, departments, onSelectDepartment }) => {
    const [selectedDepartment, setSelectedDepartment] = useState("");
  
    const handleSelectDepartment = () => {
      onSelectDepartment(selectedDepartment);
      onClose();
    };
  
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h2 className="text-lg font-bold mb-4">Assign/Change Department</h2>
            <select
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">-- Select Department --</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none"
                onClick={handleSelectDepartment}
                disabled={!selectedDepartment}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      );
  };
  