import { types } from './../../components/types/types';

describe('Pruebas en types', () => {

    test('los types deben ser correctos', () => {
        expect(types).toEqual({

            uiOpenModal: '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',

            eventSetActive: '[event] Set Active',
            eventLogout: '[event] Logout event',

            eventStartAddNew: '[event] Start add new',

            eventAddNew: '[event] Add new',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[event] Events loaded',

            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew: '[auth] Start Token Renew',
            authLogout: '[auth] Logout'

        });
    });

});
