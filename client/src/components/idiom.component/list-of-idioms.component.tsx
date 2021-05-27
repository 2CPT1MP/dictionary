import React, {useContext, useEffect, useState} from "react";
import { IdiomComponent, IIdiom } from "./idiom.component";
import {AddIdiomComponent} from "./add-idiom.component";
import {IUpdateIdiom} from "./edit-idiom.component";
import {UserContext} from "../../context/user.context";
import {useProtectedRoute} from "../../hooks/useProtectedRoute";
import {SearchComponent} from "./search.component";

class IListOfIdiomsProps {}

export const ListOfIdiomsComponent: React.FC<IListOfIdiomsProps> = () => {
  const [idioms, setIdioms] = useState<IIdiom[]>([]);
  const [filterData, setFilterData] = useState<string>("");
  const [approved, setApproved] = useState<boolean>(true);
  const {headerConfig, user, authenticated} = useContext(UserContext);
  const {get, patch, post} = useProtectedRoute();

  useEffect(() => {
      const filterQuery = filterData? `&q=${filterData}` : ``;

      const fetchIdioms = async () => {
        const data = await get<IIdiom[]>(`http://localhost:5000/api/idioms?approved=${approved}${filterQuery}`)
        setIdioms(data);
      }
      fetchIdioms();
  }, [headerConfig, approved, filterData]);

  const onApprovedChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    setApproved(!approved);
  }


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
    <>

      {authenticated && <div className="row justify-content-end mt-4 ms-0 mb-3">
          <div className="col-sm-12 col-md">
              <SearchComponent setFilter={setFilterData} filter={filterData}/>
          </div>
        <div className="col-sm-12 col-md-auto d-flex align-items-center">
          <div className="form-check form-switch">
            <input className="form-check-input shadow-none" type="checkbox" id="flexSwitchCheckChecked" checked={approved} onChange={onApprovedChange}/>
            <label className="form-check-label " htmlFor="flexSwitchCheckChecked">Только {approved? "" : "не"}проверенные</label>
          </div>
        </div>
    </div>}
        <div className={"row mb-2"}>
          <div className="col">
            <AddIdiomComponent addIdiomFn={addIdiom}/>
          </div>
      </div>
    <div className={"row"}>
      {idioms.map((idiom) =>
        <div className={"col-sm-12 col-lg-6 col-xxl-4"} key={idiom._id}>
          <IdiomComponent idiom={idiom}
                          toggleLikeFn={toggleLikeIdiom}
                          toggleApproveFn={toggleApproveIdiom}
                          updateIdiomFn={updateIdiom}
          />
        </div>
      )}
    </div>
    </>
  );
}