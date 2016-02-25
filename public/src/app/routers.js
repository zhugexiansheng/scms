import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Header from "./components/header";
import List from "./components/list";
import AddForm from "./components/addNews";
import indexPage from "./components/index";

const AppRouter = React.createClass({
	render() {
		return(
			<Router history={browserHistory}>
				<Route path="/" component={Header}>
					<IndexRoute component={indexPage}></IndexRoute>
					<Route path="list" component={List}></Route>
					<Route path="add" component={AddForm}></Route>
				</Route >
			</Router>
		);
	},
});

export default AppRouter;