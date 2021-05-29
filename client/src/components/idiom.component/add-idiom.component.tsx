import React, {useContext, useState} from "react";
import {EditIdiomComponent, IUpdateIdiom} from "./edit-idiom.component";
import {UserContext} from "../../context/user.context";
import {PlusCircle} from "react-bootstrap-icons";

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

  if (!authenticated)
    return <></>

  return (
    <>
      {!createMode && <div className={"col-12 d-flex justify-content-center"}>
        <button className={"btn shadow-none mx-2"} onClick={addIdiomHandler}><PlusCircle size={32}/> </button>
      </div>}
      {createMode && <div className={"col-sm-12 col-lg-8 col-xl-6 mx-auto"}>
        <div className="card m-2 justify-content-center">
          <div className="card-body">
          <EditIdiomComponent  idiom={emptyIdiom}
                               title={"Добавить фразеологизм"}
                               resetHandler={resetHandler}
                               submitHandler={submitHandler}
          />
          </div>
        </div>
      </div>}
    </>
  );
}
