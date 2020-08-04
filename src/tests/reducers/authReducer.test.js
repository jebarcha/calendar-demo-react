
import { authReducer } from './../../components/reducers/authReducer';
import { login } from './../../components/actions/auth';
import { types } from './../../components/types/types';
const initState = {
    checking: true,
    // uid: null,
    // name: null
}

describe('Pruebas en authReducer', () => {

    test('debe de retornar el estado por defecto', () => {

        const state = authReducer(initState, {});

        expect(state).toEqual(initState);
    });

    test('debe de autenticar el usuario', () => {

        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test'
            }
        };

        const state = authReducer(initState, action);

        //console.log(state);
        expect(state).toEqual({ checking: false, uid: '123', name: 'test' });

    });

    test('debe de setear checking en false', () => {

        const action = {
            type: types.authCheckingFinish
        };

        const state = authReducer(initState, action);

        //console.log(state);
        expect(state).toEqual({ checking: false });

    });

    test('debe de hacer el logout', () => {

        const action = {
            type: types.authLogout
        };

        const state = authReducer(initState, action);

        //console.log(state);
        expect(state).toEqual({ checking: false });

    });


});
