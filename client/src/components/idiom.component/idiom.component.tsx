import React, {useContext, useState} from "react";
import {LikeButtonComponent} from "./button/like-button.component";
import {ApproveButtonComponent} from "./button/approve-button.component";
import {EditButtonComponent} from "./button/edit-button.component";
import {EditIdiomComponent} from "./edit-idiom.component";
import {UserContext} from "../../context/user.context";
import {Roles} from "../login.component";
import {Spellcheck} from "react-bootstrap-icons";

export interface IIdiom {
  _id: string;
  idiom: string;
  definition: string;
  quote: string;
  source: string;
  likes: string[];
  approved: boolean;
}

export enum Role {
  Admin = 'admin',
  User = 'user'
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
  const {user} = useContext(UserContext);

  const isAdmin = () => {
    return user.roles.roles.filter(role => role === Roles.Admin).length > 0;
  }

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
    const currentUserId = user.userId;
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
                    <h5 className="card-title">{props.idiom.approved? <Spellcheck size={32}/> : " "} {props.idiom.idiom}</h5>
                  </div>
                  <div className="spinner-border col-auto me-3" role="status" hidden={!loading}>
                  </div>
              </div>
            <p className="card-text">{props.idiom.definition}</p>
            <blockquote className="blockquote">
              <p>{props.idiom.quote}</p>
              <footer className="blockquote-footer">{props.idiom.source}</footer>
            </blockquote>

            {!editMode  && isAdmin()&& <ApproveButtonComponent approved={props.idiom.approved}
                                    toggleApproveFn={toggleApproveFn}
            />}
            {isAdmin() && <EditButtonComponent pressed={editMode} toggleEditFn={toggleEditMode}/>}
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