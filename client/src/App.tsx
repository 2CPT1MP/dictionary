import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListOfIdiomsComponent} from "./components/idiom.component/list-of-idioms.component";

function App() {
  return (
    <div className={"container"}>
      <ListOfIdiomsComponent />
    </div>
  );
}

export default App;
