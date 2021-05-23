import React, {useState} from "react";
import {LikeButtonComponent} from "./button/like-button.component";
import {ApproveButtonComponent} from "./button/approve-button.component";
import {getCurrentUserId} from "../../fake-user";
import {EditButtonComponent} from "./button/edit-button.component";

export interface IIdiom {
  id: string;
  idiom: string;
  definition: string;
  quote: string;
  source: string;
  likes: string[];
  approved: boolean;
}

export interface IIdiomProps {
  idiom: IIdiom;
  toggleLikeFn(idiomId: string): void;
  toggleApproveFn(idiomId: string): void;
}

export const IdiomComponent: React.FC<IIdiomProps> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const toggleLikeFn = () => {
    props.toggleLikeFn(props.idiom.id);
  }

  const toggleApproveFn = () => {
    props.toggleApproveFn(props.idiom.id);
  }

  const getNumberOfLikes = () => {
    return props.idiom.likes.length;
  }

  const isLikedByCurrentUser = () => {
    const currentUserId = getCurrentUserId();
    return props.idiom.likes.filter((userId) => userId === currentUserId).length > 0;
  }

  const toggleEditMode = () => {
    setEditMode(editMode => !editMode);
  }

  return (
    <div className="card m-2">
        <div className="card-body">
          <h5 contentEditable={editMode} className="card-title">{props.idiom.idiom}</h5>
          <p contentEditable={editMode} className="card-text">{props.idiom.definition}</p>
          <blockquote className="blockquote">
            <p contentEditable={editMode}>{props.idiom.quote}</p>
            <footer className="blockquote-footer" contentEditable={editMode}>{props.idiom.source}</footer>
          </blockquote>
          <EditButtonComponent pressed={editMode} toggleEditFn={toggleEditMode}/>
          {!editMode && <ApproveButtonComponent approved={props.idiom.approved}
                                  toggleApproveFn={toggleApproveFn}
          />}
          {!editMode && <LikeButtonComponent pressed={isLikedByCurrentUser()}
                               numberOfLikes={getNumberOfLikes()}
                               toggleLikeFn={toggleLikeFn}
          />}
        </div>
    </div>
  );
}