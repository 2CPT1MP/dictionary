import React, {useContext, useEffect, useState} from "react";
import { IdiomComponent, IIdiom } from "./idiom.component";
import { getCurrentUserId } from "../../fake-user";
import {AddIdiomComponent} from "./add-idiom.component";
import {IUpdateIdiom} from "./edit-idiom.component";
import axios from "axios";
import {UserContext} from "../../context/user.context";
import {useProtectedRoute} from "../../hooks/useProtectedRoute";

class IListOfIdiomsProps {}

export const ListOfIdiomsComponent: React.FC<IListOfIdiomsProps> = () => {
  const [idioms, setIdioms] = useState<IIdiom[]>([]);
  const {config, authenticated} = useContext(UserContext);
  const {get, patch} = useProtectedRoute();

  useEffect(() => {
    const fetchIdioms = async () => {
      //const response: AxiosResponse<IIdiom[]> = await axios.get("http://localhost:5000/api/idioms", config);
      //const idioms = response.data;

      const data = await get<IIdiom[]>("http://localhost:5000/api/idioms")
      //console.log(data);
      setIdioms(data);
    }
    fetchIdioms();
  }, [config]);


  const updateIdiom = (idiomId: string, updatedIdiom: IUpdateIdiom) => {
    return new Promise(async(resolve) => {
      await patch(`http://localhost:5000/api/idioms/${idiomId}`, updatedIdiom);
      setIdioms(idioms.map(idiom => {
        if (idiom._id === idiomId)
          return {...idiom, ...updatedIdiom};
        return idiom;
      }));
      resolve("");

    });
  }

  const addIdiom = async (newIdiom: IUpdateIdiom) => {
    const response = await axios.post('http://localhost:5000/api/idioms', newIdiom);
    console.log(response.status);

    setIdioms([
      {...newIdiom, _id: "", likes: [], approved: false},
      ...idioms
    ]);
  }


  const toggleLikeIdiom = (idiomId: string) => {
    setIdioms(idioms.map(idiom => {
      if (idiom._id === idiomId) {
        const currentUserId = getCurrentUserId();
        const likedByCurrentUser = idiom.likes.filter(userId => userId === currentUserId).length !== 0;
        const otherLikes = idiom.likes.filter(userId => userId !== currentUserId);

        if (likedByCurrentUser)
          return {...idiom, likes: [...otherLikes]};
        return {...idiom, likes: [...otherLikes, currentUserId]};
      }
      return idiom;
    }));
  }

  const toggleApproveIdiom = (idiomId: string) => {
    setIdioms(idioms.map(idiom => {
      if (idiom._id === idiomId)
        return {...idiom, approved: !idiom.approved};
      return idiom;
    }));
  }


  return (
    <div className={"row"}>
      <AddIdiomComponent addIdiomFn={addIdiom}/>
      {idioms.map((idiom) =>
        <div className={"col-sm-12 col-lg-6 col-xxl-4"}>
          <IdiomComponent idiom={idiom}
                          toggleLikeFn={toggleLikeIdiom}
                          toggleApproveFn={toggleApproveIdiom}
                          updateIdiomFn={updateIdiom}
                          key={idiom._id}
          />
        </div>
      )}
    </div>
  );
}