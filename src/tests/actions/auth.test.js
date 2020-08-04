import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';
import { startLogin, startRegister, startChecking } from './../../components/actions/auth';
import { types } from './../../components/types/types';
import * as fetchModule from '../../helpers/fetch';


jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middleware = [thunk];
const mockStore = configureStore(middleware);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas en actions - auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('startLogin correcto', async () => {

        await store.dispatch(startLogin('jose@gmail.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        //console.log(localStorage.setItem.mock.calls);
        //console.log(localStorage.setItem.mock.calls[0][1]);  //token

    });

    test('startLogin incorrecto ', async () => {

        await store.dispatch(startLogin('jose@gmail.com', '1234567'));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'El password incorrecto', 'error');

        await store.dispatch(startLogin('jose@gmail2.com', '123456'));
        actions = store.getActions();
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'El usuario no existe con ese email', 'error');

    });

    test('startRegister correcto', async () => {

        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'test',
                    token: '1231223'
                }
            }
        }));

        await store.dispatch(startRegister('juan@gmail.com', '123456', 'test'));

        const actions = store.getActions();
        //console.log(actions);

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', '1231223');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });

    test('startChecking correcto', async () => {

        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'test',
                    token: '1231223'
                }
            }
        }));

        await store.dispatch(startChecking());

        const actions = store.getActions();
        //console.log(actions);

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', '1231223');

    });





});
