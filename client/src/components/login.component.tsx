import React, {useContext, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {UserContext} from "../context/user.context";
import {Modal} from "react-bootstrap";

interface ILoginProps {}

export enum Roles  {
  Admin = 'admin',
  User = 'user'
}

type UserResponseData = {
  access_token: string,
  userId: string
  roles: Roles[],
}

export const LoginComponent: React.FC<ILoginProps> = () => {
  const {setToken, authenticated} = useContext(UserContext);
  const [error, setError] = useState<string>("");

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
    return new Promise(async(resolve) => {
      event.preventDefault();
      try {
        const response: AxiosResponse<UserResponseData> = await axios.post('http://localhost:5000/auth/login', loginData);
        setToken(response.data.access_token);
        //user.setUserId(response.data.userId);
        //user.roles.setRoles([...response.data.roles]);
        resolve(true);
      } catch (e) {
        setError("Неверный логин или пароль");
      }
    });
  };



  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });
  }

  const signInButton = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
      <path fillRule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
    </svg>
  );

  if (authenticated)
    return <></>;

  return (
    <Modal show={true} size={"sm"}>
      <form onSubmit={onSubmit}>
        <Modal.Header>
          <div className={"w-100 d-flex justify-content-center"}>
            <h3 className={""}>Авторизация</h3>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="col-auto">
            <div className="alert alert-danger col" role="alert" hidden={error === ""}>
              {error}
            </div>
            <div className="mb-3">
              <div className="row align-items-center">
                <div className="col-3">
                  <label htmlFor="username" className="form-label mb-0">Логин</label>
                </div>
                <div className="col">
                  <input type="text" className="form-control no-border" id="username" name={"username"}
                         value={loginData.username} onChange={onChange} required/>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row align-items-center">
                <div className="col-3">
              <label htmlFor="password" className="form-label">Пароль</label>
                </div>
                <div className="col">
                  <input type="password" className="form-control" id="password" name={"password"}
                     value={loginData.password} onChange={onChange} required/>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className={"w-100 d-flex justify-content-center"}>
            <button className={"btn shadow-none btn-dark"} type={"submit"}>{signInButton} Войти</button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};