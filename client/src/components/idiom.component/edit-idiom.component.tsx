import React, {useState} from "react";
import {IIdiom} from "./idiom.component";

export interface IUpdateIdiom {
  idiom: string;
  definition: string;
  quote: string;
  source: string;
}

interface IEditIdiomProps {
  idiom: IIdiom,
  resetHandler(): void;
  submitHandler(updatedIdiom: IUpdateIdiom): void;
}

export const EditIdiomComponent: React.FC<IEditIdiomProps> = ({idiom, resetHandler, submitHandler}) => {
  const [formData, setFormData] = useState({
    idiom: idiom.idiom,
    definition: idiom.definition,
    quote: idiom.quote,
    source: idiom.source
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitHandler(formData);
  }

  const onReset: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetHandler();
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value}
    );
  }

  const resetIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  );

  const submitIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
    </svg>
  );

  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <h5>Редактирование</h5>
      <div className="mb-3">
        <label htmlFor="idiom" className="form-label">Тело</label>
        <input type="text" className="form-control no-border" id="definition" name={"idiom"} value={formData.idiom} onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="definition" className="form-label">Определение</label>
        <input type="text" className="form-control" id="definition" name={"definition"} value={formData.definition} onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="quote" className="form-label">Цитата</label>
        <input type="text" className="form-control" id="quote" name={"quote"} value={formData.quote} onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="source" className="form-label">Источник</label>
        <input type="text" className="form-control" id="source" name={"source"} value={formData.source} onChange={onChange}/>
      </div>
      <button className={"btn shadow-none"} type={"submit"}>{submitIcon}</button>
      <button className={"btn shadow-none"} type={"reset"}>{resetIcon}</button>
    </form>
  );
}