import React, {useState} from "react";
import TextAreaAutosize from 'react-textarea-autosize'
import {CheckCircle, XCircle} from "react-bootstrap-icons";

export interface IUpdateIdiom {
  idiom: string;
  definition: string;
  quote: string;
  source: string;
}

interface IEditIdiomProps {
  idiom: IUpdateIdiom,
  title?: string
  resetHandler(): void;
  submitHandler(updatedIdiom: IUpdateIdiom): void;
}

export const EditIdiomComponent: React.FC<IEditIdiomProps> = ({idiom, resetHandler, submitHandler, title="Изменить фразеологизм"}) => {
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

  const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value}
    );
  }

  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <h5>{title}</h5>
      <div className="mb-3 mt-3">
        <div className="row align-items-start">
          <div className="col-sm-12 col-md-4">
            <label htmlFor="idiom" className="form-label">Тело</label>
          </div>
          <div className="col">
            <TextAreaAutosize minRows={1} maxRows={10} className={"form-control"}
                              name={"idiom"} id={"idiom"} value={formData.idiom} onChange={onChange} required/>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row align-items-start">
          <div className="col-sm-12 col-md-4">
            <label htmlFor="definition" className="form-label">Определение</label>
          </div>
          <div className="col">
            <TextAreaAutosize minRows={1} maxRows={10} className={"form-control"}
                              name={"definition"} id={"definition"} value={formData.definition} onChange={onChange} required/>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row align-items-start">
          <div className="col-sm-12 col-md-4">
            <label htmlFor="quote" className="form-label">Цитата</label>
          </div>
          <div className="col">
            <TextAreaAutosize minRows={1} maxRows={10} className={"form-control"}
                              name={"quote"} id={"quote"} value={formData.quote} onChange={onChange} required/>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row align-items-start">
          <div className="col-sm-12 col-md-4">
            <label htmlFor="source" className="form-label">Источник</label>
          </div>
          <div className="col">
            <TextAreaAutosize minRows={1} maxRows={10} className={"form-control"}
                              name={"source"} id={"source"} value={formData.source} onChange={onChange} required/>
          </div>
        </div>


      </div>
      <button className={"btn shadow-none"} type={"submit"}><CheckCircle /></button>
      <button className={"btn shadow-none"} type={"reset"}><XCircle /></button>
    </form>
  );
}