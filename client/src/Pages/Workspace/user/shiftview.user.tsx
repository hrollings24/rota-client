import React from 'react';
import ShiftCard from './shiftcard.user';
import { ParsedShiftResponse } from '../admin/workspace.department.page';

interface ShiftViewProps {
  shifts: ParsedShiftResponse[];
  loading: boolean;
  title: string;
  workspaceId: string;
}

const ShiftView: React.FC<ShiftViewProps> = ({ shifts, loading, title, workspaceId }) => (
  <div className="p-8">
    <h1 className="font-bold text-white text-2xl mb-4">{title}</h1>
    {loading ? (
      <p className="text-gray-500">Loading...</p>
    ) : shifts.length === 0 ? (
      <p className="text-gray-500">No shifts assigned for {title.toLowerCase()}.</p>
    ) : (
      <ShiftCard shifts={shifts} workspaceId={workspaceId} />
    )}
  </div>
);

export default ShiftView;
