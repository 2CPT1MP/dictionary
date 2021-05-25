import React, {useContext, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {UserContext} from "../context/user.context";

interface ILoginProps {
}
export const LoginComponent: React.FC<ILoginProps> = () => {
  const {setToken, authenticated} = useContext(UserContext);
  const [error, setError] = useState<string>("");

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response: AxiosResponse<{access_token: string}> = await axios.post('http://localhost:5000/auth/login', loginData);
      setToken(response.data.access_token);
    } catch (e) {
      setError("Неверный логин или пароль");
    }

  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });
  }

  const signInButton = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
      <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
    </svg>
  );

  if (authenticated)
    return <></>;

  return (
    <div className={"row justify-content-center mt-5"}>
      <div className="col-auto">
        <form onSubmit={onSubmit}>
          <h3 className={"text-center mb-3"}>Авторизация</h3>
          <div className="alert alert-danger col" role="alert" hidden={error === ""}>
            {error}
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Логин</label>
            <input type="text" className="form-control no-border" id="username" name={"username"} value={loginData.username} onChange={onChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input type="password" className="form-control" id="password" name={"password"} value={loginData.password} onChange={onChange} required/>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <button className={"btn shadow-none btn-dark"} type={"submit"}>{signInButton} Войти</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};