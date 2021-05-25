import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListOfIdiomsComponent} from "./components/idiom.component/list-of-idioms.component";
import {LoginComponent} from "./components/login.component";
import {UserProvider} from "./context/user.context";

function App() {
  return (
    <UserProvider>
      <div className={"container"}>
        <LoginComponent />
        <ListOfIdiomsComponent />
      </div>
    </UserProvider>
  );
}

export default App;
