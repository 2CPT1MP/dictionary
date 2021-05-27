import React, {useContext, useEffect, useState} from "react";
import { IdiomComponent, IIdiom } from "./idiom.component";
import {AddIdiomComponent} from "./add-idiom.component";
import {IUpdateIdiom} from "./edit-idiom.component";
import {UserContext} from "../../context/user.context";
import {useProtectedRoute} from "../../hooks/useProtectedRoute";

class IListOfIdiomsProps {}

export const ListOfIdiomsComponent: React.FC<IListOfIdiomsProps> = () => {
  const [idioms, setIdioms] = useState<IIdiom[]>([]);
  const {headerConfig, authenticated, user} = useContext(UserContext);
  const {get, patch, post} = useProtectedRoute();

  useEffect(() => {
      const fetchIdioms = async () => {
        const data = await get<IIdiom[]>("http://localhost:5000/api/idioms")
        setIdioms(data);
      }
      fetchIdioms();
  }, [headerConfig]);


  const updateIdiom = (idiomId: string, updatedIdiom: IUpdateIdiom) => {
    return new Promise(async(resolve) => {
      await patch(`http://localhost:5000/api/idioms/${idiomId}`, updatedIdiom);
      setIdioms(idioms.map(idiom => {
        if (idiom._id === idiomId)
          return {...idiom, ...updatedIdiom};
        return idiom;
      }));
      resolve(true);
    });
  }

  const addIdiom = async (newIdiom: IUpdateIdiom) => {
    return new Promise(async(resolve) => {
      const response = await post<IIdiom>('http://localhost:5000/api/idioms', newIdiom);

      setIdioms([
        {
          ...newIdiom,
          _id: response._id,
          likes: [...response.likes],
          approved: response.approved
        },
        ...idioms
      ]);
      resolve(true)
    });
  }


  const toggleLikeIdiom = async(idiomId: string) => {
    return new Promise(async(resolve) => {
      let liked: boolean = false;
      const currentUserId = user.userId;
      idioms.forEach((idiom) => {
        if (idiom._id === idiomId)
          liked = idiom.likes.filter(userId => userId === currentUserId).length !== 0;
      });

      await post(`http://localhost:5000/api/idioms/${idiomId}/like`, {like: !liked});

      setIdioms(idioms.map(idiom => {
        if (idiom._id === idiomId) {
          const otherLikes = idiom.likes.filter(userId => userId !== currentUserId);
          return {...idiom,
            likes: liked? [...otherLikes] : [...otherLikes, currentUserId]
          }
        }
        return idiom;
      }));
      resolve(true);
  })};

  const toggleApproveIdiom = (idiomId: string) => {
    return new Promise(async(resolve) => {
      const target = idioms.find((idiom) => idiom._id === idiomId);

      if (target) {
        const toggledState = !target.approved;
        await post(`http://localhost:5000/api/idioms/${idiomId}/approve`, {approve: toggledState});
        setIdioms(idioms.map(idiom => {
          if (idiom._id === idiomId)
            return {...idiom, approved: toggledState};
          return idiom;
        }));
        resolve(true);
      }
    });
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