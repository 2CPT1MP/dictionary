import React, {useContext, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {UserContext} from "../context/user.context";
import {Modal} from "react-bootstrap";
import {CheckCircle, PersonPlus, BoxArrowInLeft, Key, PersonLinesFill} from 'react-bootstrap-icons';

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
  const {user, setToken, authenticated, setAuthenticated} = useContext(UserContext);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [registerMode, setRegisterMode] = useState<boolean>(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
    return new Promise(async(resolve) => {
      event.preventDefault();
      registerMode? await register() : await login();
    });
  };

  const login = async() => {
    return new Promise(async(resolve) => {
      try {
        const response: AxiosResponse<UserResponseData> = await axios.post('http://localhost:5000/auth/login', loginData);
        setToken(response.data.access_token);
        user.setUserId(response.data.userId);
        user.roles.setRoles([...response.data.roles]);
        resolve(true);
      } catch (e) {
        setMessage("");
        setError("Неверный логин или пароль");
      }
    });
  }

  const register = () => {
    return new Promise(async(resolve) => {
      try {
        const response: AxiosResponse<UserResponseData> = await axios.post('http://localhost:5000/auth/register', loginData);
        setError("");
        setMessage("Успешная регистрация")
        setRegisterMode(false);
        resolve(true);
      } catch (e) {
        setMessage("");
        setError("Ошибка при регистрации");
      }
    });
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });
  }

  const onSignOut: React.MouseEventHandler<HTMLDivElement> = (event) => {
    setToken("");
    user.roles.setRoles([]);
    user.setUserId("");
    setAuthenticated(false);
  }

  const onChangeMode = () => {
    setRegisterMode(!registerMode);
  }

  if (authenticated)
    return (
      <div className={"row justify-content-end mt-3"}>
        <div className="col-auto" onClick={onSignOut}>
          <button className={"btn btn-outline-dark"}>Выйти</button>
        </div>
      </div>
    );

  return (
    <Modal show={true} size={"sm"}>
      <form onSubmit={onSubmit}>
        <Modal.Header>
          <div className={"w-100 d-flex justify-content-center"}>
            <h3>{registerMode? "Регистрация" : "Авторизация"}</h3>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="col-auto">
            <div className="alert alert-info col" role="alert" hidden={message === ""}>
              {message}
            </div>
            <div className="alert alert-danger col" role="alert" hidden={error === ""}>
              {error}
            </div>
            <div className="mb-3">
              <div className="row align-items-center">
                <div className="col-5">
                  <label htmlFor="username" className="form-label mb-0"><PersonLinesFill /> Логин</label>
                </div>
                <div className="col">
                  <input type="text" className="form-control no-border" id="username" name={"username"}
                         value={loginData.username} onChange={onChange} required/>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row align-items-center">
                <div className="col-5">
              <label htmlFor="password" className="form-label"><Key /> Пароль</label>
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
          {!registerMode && <>
            <button type="button"
                    className={"btn shadow-none btn-outline-dark"}
                    onClick={onChangeMode}><PersonPlus /> Регистрация</button>
            <button className={"btn shadow-none btn-dark"} type={"submit"}><BoxArrowInLeft /> Войти</button>
          </>}
          {registerMode && <>
              <button type="button"
                      className={"btn shadow-none btn-outline-dark"}
                      onClick={onChangeMode}><BoxArrowInLeft /> Вход</button>
              <button className={"btn shadow-none btn-dark"} type={"submit"}><CheckCircle /> Подтвердить</button>
          </>}
        </Modal.Footer>
      </form>
    </Modal>
  );
};