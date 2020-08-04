const { fetchSinToken, fetchConToken } = require("../../helpers/fetch");

describe('Pruebas en el helper fetch', () => {

    let token = '';

    test('fetch sin token debe de funcionar', async () => {

        const resp = await fetchSinToken('auth', {
            "email": "jose@gmail.com",
            "password": "123456"
        }, 'POST');

        expect(resp instanceof Response).toBe(true);

        //console.log(resp);

        const body = await resp.json();
        expect(body.ok).toBe(true);

        token = body.token;
    });

    test('fetch con token debe de funcionar', async () => {

        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/5f247fcf5aac562b589990ex', {}, 'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('Hable con el administrador');
    });

});
