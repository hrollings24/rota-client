
export interface ShiftFilterInput {
    earliestStartDate?: string; // ISO-8601 date string
    latestStartDate?: string;   // ISO-8601 date string
    departmentId?: string;      // UUID as a string
    assignedToAccountId?: string;
    state?: ShiftState;
  }

  export enum ShiftState {
    UNKNOWN = 'UNKNOWN',
    AVALIABLE_TO_PICK_UP = 'AVALIABLE_TO_PICK_UP',
    UNASSIGNED_AND_HIDDEN = 'UNASSIGNED_AND_HIDDEN',
    ASSIGNED = 'ASSIGNED',
  }