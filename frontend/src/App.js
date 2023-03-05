import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spots";
import SpotDetail from "./components/SpotDetail";
import SpotForm from "./components/SpotForm";
import ManageSpotsIndex from "./components/ManageSpots";
import UpdateSpotForm from "./components/UpdateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={SpotsIndex} />
          <Route path={`/spots/new`} component={SpotForm} />
          <Route path={'/spots/current'} component={ManageSpotsIndex} />
          <Route exact path={`/spots/:spotId/edit`} component={UpdateSpotForm} />
          <Route path={`/spots/:spotId`} component={SpotDetail} />
        </Switch>
      )}
    </>
  );
}

export default App;
