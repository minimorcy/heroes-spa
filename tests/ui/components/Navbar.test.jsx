import { MemoryRouter, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../src/auth/context"
import { Navbar } from "../../../src/ui"
import { fireEvent, render, screen } from "@testing-library/react"

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <Navbar />', () => 
{
    test('debe de mostrar el nombre del usuario', () => 
    {
        const contextValue = 
        {
            logged: false,
            user: {
                name: 'Pepe',
                id: 'ANC'
            }
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug()

        expect(screen.getByText('Pepe')).toBeTruthy()
    })

    test('debe de llamar el logout y navigate cuando se hace click en el botón', () => 
    {
        const logout = jest.fn();

        const contextValue = 
        {
            logged: false,
            user: {
                name: 'Pepe',
                id: 'ABC'
            },
            logout
        }

        const component = render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const buttonLogout = component.getByText('Logout')
        fireEvent.click(buttonLogout)

        expect(logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {'replace': true})
    })
})