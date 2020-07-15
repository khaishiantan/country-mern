import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";
import manageCountry from "./manageCountry";

//Router use to route to EachArtist.js page (show detail of selected artist)

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={App} exact />
			<Route path="/manageCountry" component={manageCountry} />
		</Switch>
	</BrowserRouter>
);

export default Router;
