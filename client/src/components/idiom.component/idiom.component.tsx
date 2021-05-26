import React, {useContext, useState} from "react";
import {LikeButtonComponent} from "./button/like-button.component";
import {activeApproveIcon, ApproveButtonComponent, inactiveApproveIcon} from "./button/approve-button.component";
import {EditButtonComponent} from "./button/edit-button.component";
import {EditIdiomComponent} from "./edit-idiom.component";
import {UserContext} from "../../context/user.context";
import {Roles} from "../login.component";

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

  const verified = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-spellcheck"
         viewBox="0 0 16 16">
      <path
        d="M8.217 11.068c1.216 0 1.948-.869 1.948-2.31v-.702c0-1.44-.727-2.305-1.929-2.305-.742 0-1.328.347-1.499.889h-.063V3.983h-1.29V11h1.27v-.791h.064c.21.532.776.86 1.499.86zm-.43-1.025c-.66 0-1.113-.518-1.113-1.28V8.12c0-.825.42-1.343 1.098-1.343.684 0 1.075.518 1.075 1.416v.45c0 .888-.386 1.401-1.06 1.401zm-5.583 1.035c.767 0 1.201-.356 1.406-.737h.059V11h1.216V7.519c0-1.314-.947-1.783-2.11-1.783C1.355 5.736.75 6.42.69 7.27h1.216c.064-.323.313-.552.84-.552.527 0 .864.249.864.771v.464H2.346C1.145 7.953.5 8.568.5 9.496c0 .977.693 1.582 1.704 1.582zm.42-.947c-.44 0-.845-.235-.845-.718 0-.395.269-.684.84-.684h.991v.538c0 .503-.444.864-.986.864zm8.897.567c-.577-.4-.9-1.088-.9-1.983v-.65c0-1.42.894-2.338 2.305-2.338 1.352 0 2.119.82 2.139 1.806h-1.187c-.04-.351-.283-.776-.918-.776-.674 0-1.045.517-1.045 1.328v.625c0 .468.121.834.343 1.067l-.737.92z"/>
      <path
        d="M14.469 9.414a.75.75 0 0 1 .117 1.055l-4 5a.75.75 0 0 1-1.116.061l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.908 1.907 3.476-4.346a.75.75 0 0 1 1.055-.117z"/>
    </svg>
  );

  return (
    <div className="card m-2">
        <div className="card-body">
          {!editMode && <>
              <div className="row">
                  <div className="col">
                    <h5 className="card-title">{props.idiom.approved? verified : " "} {props.idiom.idiom}</h5>
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