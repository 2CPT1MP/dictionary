import React, {useContext, useState} from "react";
import {EditIdiomComponent, IUpdateIdiom} from "./edit-idiom.component";
import {IIdiom} from "./idiom.component";
import {UserContext} from "../../context/user.context";

interface IAddIdiomProps {
  addIdiomFn(newIdiom: IUpdateIdiom): void;
}

export const AddIdiomComponent: React.FC<IAddIdiomProps> = ({addIdiomFn}) => {
  const [createMode, setCreateMode] = useState<boolean>(false);
  const {authenticated} = useContext(UserContext);

  const resetHandler = () => {
    setCreateMode(false);
  }

  const submitHandler = (formData: IUpdateIdiom) => {
    addIdiomFn(formData);
    setCreateMode(false);
  }

  const emptyIdiom: IUpdateIdiom = {
    definition: "", idiom: "", quote: "", source: ""
  }

  const addIdiomHandler = () => {
    setCreateMode(!createMode);
  }

  const addIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
  );

  if (!authenticated)
    return <></>

  return (
    <>
      <div className={"col-12"}><button className={"btn shadow-none"} onClick={addIdiomHandler}> {addIcon} </button></div>
      {createMode && <div className={"col-sm-12 col-lg-6 col-xxl-4"}>
        <div className="card m-2 ">
          <div className="card-body">
          <EditIdiomComponent  idiom={emptyIdiom}
                               title={"Добавление"}
                               resetHandler={resetHandler}
                               submitHandler={submitHandler}
          />
          </div>
        </div>
      </div>}
    </>
  );
}
