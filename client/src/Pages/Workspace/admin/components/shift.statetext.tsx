import { ShiftState } from "../../../../Types/Workspace";
import { ParsedShiftResponse } from "../workspace.department.page";

interface CardProps {
    shift: ParsedShiftResponse;
  }

  
const ShiftStateText: React.FC<CardProps> = ({ shift }) => {

    if (shift.state === ShiftState.ASSIGNED) {
        return <p>Assigned To User: {shift.assignedUser.firstName}</p>
    }

    if (shift.state === ShiftState.UNASSIGNED_AND_HIDDEN) {
        return <p>This shift is currently unassigned and not visible to employees.</p>
    }

    if (shift.state === ShiftState.AVALIABLE_TO_PICK_UP) {
        return <p>This shift is avaliable to be picked up by an employee.</p>
    }

    return <p>Unknown</p>
}

export default ShiftStateText;