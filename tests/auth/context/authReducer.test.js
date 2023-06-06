import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from '../../../src/auth/types/types'

describe('Pruebas en authReducer', () => 
{ 
    test('debe retornar el estado por defecto', () => 
    {
        const initialState = {}

        const newState = authReducer(initialState, {})

        expect(newState).toBe(initialState)
    })
    
    test('debe de (login) llamar el login autenticar y establecer el user', () => 
    {
        const action = { type: types.login, payload: {"id":"ABC","name":"MiniM"}}
        const initialState = {}

        const newState = authReducer(initialState, action)
        expect(newState.user).not.toBeNull()
        expect(newState.logged).toBeTruthy()
    })

    test('debe de (logout) borrar el name del usuario y logged en false', () => 
    {
        const action = { type: types.logout }
        const initialState = { logged: true, user: { id: 'ABC', name: 'MiniM' } }

        const newState = authReducer(initialState, action)
        expect(newState.user).toBeUndefined()
        expect(newState.logged).not.toBeTruthy()
    })
})