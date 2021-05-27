import React, {useState} from "react";
import {CheckCircle} from "react-bootstrap-icons";


interface ISearchComponentProps {
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

export const SearchComponent: React.FC<ISearchComponentProps> = ({filter, setFilter}) => {


  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFilter(event.target.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="">
        <div className="row d-flex align-items-center">
          <div className="col-auto">
            <label htmlFor="filter" className="form-label mb-0">Поиск</label>
          </div>
          <div className="col">
            <input type="text" className={"form-control"} name={"filter"} id={"filter"} onChange={onChange}/>
          </div>
          <div className="col-auto" hidden={true}>
            <button className={"btn shadow-none"} type={"submit"}><CheckCircle /></button>
          </div>
        </div>
      </div>
    </form>
  );
}