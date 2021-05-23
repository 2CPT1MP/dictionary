import React, {useState} from "react";
import { IdiomComponent, IIdiom } from "./idiom.component";
import { getCurrentUserId } from "../../fake-user";
import { fakeIdioms } from "../../fake-idioms";
import {AddIdiomComponent} from "./add-idiom.component";
import {IUpdateIdiom} from "./edit-idiom.component";

class IListOfIdiomsProps {}

export const ListOfIdiomsComponent: React.FC<IListOfIdiomsProps> = () => {
  const [idioms, setIdioms] = useState<IIdiom[]>(fakeIdioms);


  const updateIdiom = (idiomId: string, updatedIdiom: IUpdateIdiom) => {
    setIdioms(idioms.map(idiom => {
      if (idiom.id === idiomId)
        return {...idiom, ...updatedIdiom};
      return idiom;
    }));
  }

  const addIdiom = (newIdiom: IUpdateIdiom) => {
    setIdioms([
      {...newIdiom, id: "", likes: [], approved: false},
      ...idioms
    ]);
  }


  const toggleLikeIdiom = (idiomId: string) => {
    setIdioms(idioms.map(idiom => {
      if (idiom.id === idiomId) {
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
      if (idiom.id === idiomId)
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
                          key={idiom.id}
          />
        </div>
      )}
    </div>
  );
}