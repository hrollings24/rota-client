import { ParsedShiftResponse } from "../workspace.department.page";

interface CardProps {
    shift: ParsedShiftResponse;
  }

  
const ShiftStateText: React.FC<CardProps> = ({ shift }) => {

    if (shift.state === "ASSIGNED") {
        return <p>Assigned To User: {shift.assignedUser.firstName}</p>
    }

    if (shift.state === "UnassignedAndHidden") {
        return <p>This shift is currently unassigned and not visible to employees.</p>
    }

    if (shift.state === "AvaliableToPickUp") {
        return <p>This shift is avaliable to be picked up by an employee.</p>
    }

    return <p>Unknown</p>
}

export default ShiftStateText;