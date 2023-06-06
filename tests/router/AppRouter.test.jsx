const { render, screen } = require("@testing-library/react")
const { AuthContext } = require("../../src/auth/context/AuthContext")
const { MemoryRouter } = require("react-router-dom")
const { AppRouter } = require("../../src/router/AppRouter")

describe('Pruebas en <AppRouter />', () => 
{
    test('debe de mostrar el login si no está autenticado', () => 
    {
        const contextValue = 
        {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug()

        expect(screen.getByText('Login')).toBeTruthy()

    })

    test('debe de mostrar el componente de Marvel si está autenticado', () => 
    {
        const contextValue = 
        {
            logged: true,
            user: {
                name: 'Pepe',
                id: 'ABC'
            }
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Marvel")
    })
})