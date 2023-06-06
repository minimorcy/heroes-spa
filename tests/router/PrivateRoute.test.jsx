import { render, screen } from "@testing-library/react"
import { PrivateRoute } from "../../src/router/PrivateRoute"
import { AuthContext } from "../../src/auth/context"
import { MemoryRouter, Route, Routes } from "react-router-dom"

describe('Pruebas en componente <PrivateRoute />', () => 
{
    test('debe mostrar el children si está autenticado', () => 
    {
        Storage.prototype.setItem = jest.fn()

        const contextValue = 
        {
            logged: true,
            user: { id: 'ABC', name: 'Strider'}
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>    
        )

        // screen.debug()
        expect(screen.getByText('Ruta privada')).toBeTruthy()
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel')
    })
})