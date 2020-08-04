import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from './../components/auth/LoginScreen';
import { CalendarScreen } from './../components/calendar/CalendarScreen';
import { startChecking } from './../components/actions/auth';
import Swal from 'sweetalert2';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {

        dispatch(startChecking())

    }, [dispatch])

    if (checking) {
        return <h5>Espere...</h5>
        // Swal.fire({
        //     icon: 'info',
        //     title: 'Espere...',
        //     showConfirmButton: false
        // })
    }
    // else {
    //     Swal.close();
    // }

    return (
        <div>
            <Router>
                <Switch>
                    <PublicRoute
                        exact
                        path='/login'
                        component={LoginScreen}
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute
                        exact
                        path='/'
                        component={CalendarScreen}
                        isAuthenticated={!!uid}
                    />

                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
}
