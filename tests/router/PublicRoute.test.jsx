import { render, screen } from "@testing-library/react"
import { PublicRoute } from "../../src/router/PublicRoute"
import { AuthContext } from "../../src/auth/context"
import { MemoryRouter, Route, Routes } from "react-router-dom"

describe('Pruebas en componente <PublicRoute />', () => 
{
    test('debe mostrar el children si no está autenticado', () => 
    {
        const contextValue = 
        {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>    
        )

        expect(screen.getByText('Ruta pública')).toBeTruthy()
        // screen.debug()
    })

    test('debe de navegar si está autenticado', () => 
    {
        const contextValue = 
        {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>} 
                        />
                        <Route path='/' element={<h1>Página Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>    
        )

        // screen.debug()
        expect(screen.getByText('Página Marvel')).toBeTruthy()
    })
})