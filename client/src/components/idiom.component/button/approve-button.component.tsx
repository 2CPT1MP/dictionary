import React from "react";
import {CheckCircle, XCircle} from "react-bootstrap-icons";

interface IApproveButtonProps {
  approved: boolean
  toggleApproveFn(): void;
}

export const ApproveButtonComponent: React.FC<IApproveButtonProps> = (props) => {
  if (!props.approved)
    return (
      <button className="btn shadow-none" onClick={props.toggleApproveFn}>
        <CheckCircle />
      </button>
    );
  else return (
    <button className="btn shadow-none" onClick={props.toggleApproveFn}>
      <XCircle />
    </button>
  );
};