import React, {useState} from "react";
import {LikeButtonComponent} from "./button/like-button.component";
import {ApproveButtonComponent} from "./button/approve-button.component";
import {getCurrentUserId} from "../../fake-user";
import {EditButtonComponent} from "./button/edit-button.component";
import {EditIdiomComponent} from "./edit-idiom.component";

export interface IIdiom {
  _id: string;
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
  updateIdiomFn(idiomId: string, updatedIdiom: IIdiom): void
}

export const IdiomComponent: React.FC<IIdiomProps> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleLikeFn = () => {
    props.toggleLikeFn(props.idiom._id);
  }

  const toggleApproveFn = () => {
    props.toggleApproveFn(props.idiom._id);
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

  const resetHandler = () => {
    setEditMode(false);
  }

  const updateIdiom = async (updatedIdiom: IIdiom) => {
    setLoading(true);
    setEditMode(false);
    await props.updateIdiomFn(props.idiom._id, updatedIdiom);
    setLoading(false);
  }

  return (
    <div className="card m-2">
        <div className="card-body">
          {!editMode && <>
              <div className="row">
                  <div className="col">
                    <h5 className="card-title">{props.idiom.idiom}</h5>
                  </div>
                  <div className="spinner-border col-auto me-3" role="status" hidden={!loading}>
                  </div>
              </div>
            <p className="card-text">{props.idiom.definition}</p>
            <blockquote className="blockquote">
              <p>{props.idiom.quote}</p>
              <footer className="blockquote-footer">{props.idiom.source}</footer>
            </blockquote>
            <EditButtonComponent pressed={editMode} toggleEditFn={toggleEditMode}/>
            {!editMode && <ApproveButtonComponent approved={props.idiom.approved}
                                    toggleApproveFn={toggleApproveFn}
            />}
            </>}
          {!editMode && <LikeButtonComponent pressed={isLikedByCurrentUser()}
                               numberOfLikes={getNumberOfLikes()}
                               toggleLikeFn={toggleLikeFn}
          />}
          {editMode && <EditIdiomComponent idiom={props.idiom}
                                           resetHandler={resetHandler}
                                           submitHandler={updateIdiom}

          />}
        </div>
    </div>
  );
}