import React, {useContext, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {UserContext} from "../context/user.context";

interface ILoginProps {
}
export const LoginComponent: React.FC<ILoginProps> = () => {
  const {setToken} = useContext(UserContext)

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
      console.log(e);
    }

  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className={"row justify-content-center"}>
      <div className={"col-auto"}>
        <form onSubmit={onSubmit}>
          <h5 className={"text-center"}>Авторизация</h5>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Логин</label>
            <input type="text" className="form-control no-border" id="username" name={"username"} value={loginData.username} onChange={onChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input type="password" className="form-control" id="password" name={"password"} value={loginData.password} onChange={onChange} required/>
          </div>
          <button className={"btn shadow-none btn-primary"} type={"submit"}>Логин</button>
        </form>
      </div>
    </div>
  );
};