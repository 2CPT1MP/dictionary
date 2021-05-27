import React from "react";
import {Save, Eraser, Pen} from 'react-bootstrap-icons'

interface IEditButtonProps {
  pressed: boolean,
  toggleEditFn(): void
}

export const EditButtonComponent: React.FC<IEditButtonProps> = ({toggleEditFn, pressed}) => {
  if (pressed)
    return (
      <>
        <button className="btn shadow-none" onClick={toggleEditFn}>
          <Save />
        </button>
        <button className="btn shadow-none" onClick={toggleEditFn}>
          <Eraser />
        </button>
      </>
    );
  return (
    <button className="btn shadow-none" onClick={toggleEditFn}>
      <Pen />
    </button>
  );
}