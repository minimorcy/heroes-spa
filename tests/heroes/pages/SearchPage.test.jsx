import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"
import { fireEvent, render, screen } from "@testing-library/react"

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <SearchPage />', () => 
{

    beforeEach(() => jest.clearAllMocks())

    test('debe de mostrarse correctamente con valores por defecto ', () => 
    {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        // screen.debug()

        expect(container).toMatchSnapshot()
    })

    test('debe de mostrar a batman y el input con el valor del queryString ', () => 
    {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('batman')
    })

    test('debe mostrar un error si no se encuentra un heroe (batman123)', () => 
    {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        const alert = screen.getByLabelText('alert-danger')
        expect(alert.style.display).toBe('')
    })

    test('debe de llamar el navigate a la pantalla nueva', () => 
    {

        const component = render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        const inputSearch = screen.getByLabelText('search-text')
        fireEvent.change(inputSearch, {target: {value: 'batman123'}})
        
        const formSearch = screen.getByLabelText('form-text')
        fireEvent.submit(formSearch)
        
        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=batman123')
    })
})