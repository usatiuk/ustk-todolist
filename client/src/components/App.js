import * as React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Protected from "./Protected";
import OnlyUnauth from "./OnlyUnauth";
import "./Container.css";
import "./App.css";
import TodosView from "./todolist/TodosView";
import LoginForm from "./user/LoginForm";
import SignupForm from "./user/SignupForm";
import EditForm from "./user/EditForm";

const ProtectedTodosView = Protected(TodosView);

const ProtectedLoginForm = OnlyUnauth(LoginForm);

const ProtectedSignupForm = OnlyUnauth(SignupForm);

const ProtectedEditView = Protected(EditForm);

export default class App extends React.PureComponent {
    componentDidMount() {
        const { loadUser } = this.props;
        loadUser();
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Router>
                    <div id="container">
                        <Route exact path="/" component={ProtectedTodosView} />
                        <Route path="/login" component={ProtectedLoginForm} />
                        <Route path="/signup" component={ProtectedSignupForm} />
                        <Route path="/edit" component={ProtectedEditView} />
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

App.propTypes = {
    loadUser: PropTypes.func.isRequired,
};
