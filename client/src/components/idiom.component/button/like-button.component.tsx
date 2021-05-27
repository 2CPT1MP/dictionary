import React from "react";
import {HeartFill, Heart} from "react-bootstrap-icons";

interface ILikeButtonProps {
  pressed: boolean,
  numberOfLikes: number,
  toggleLikeFn(): void
}

export const LikeButtonComponent: React.FC<ILikeButtonProps> = ({toggleLikeFn, numberOfLikes, pressed}) => {
  if (pressed)
    return (
      <button className="btn shadow-none" onClick={toggleLikeFn} >
        <HeartFill /><sup> {numberOfLikes}</sup>
      </button>
    );
  else return (
    <button className="btn shadow-none" onClick={toggleLikeFn}>
     <Heart /><sup> {numberOfLikes}</sup>
    </button>
  );
}