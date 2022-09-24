import React, { useContext } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const PrivateRoute = ({children, ...rest}) => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
            JSON.parse(localStorage.getItem('loggedInUser')).email ? (
                    children
                ) : (
                    <Link
                        to={{
                            pathname: "/login/existing",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;