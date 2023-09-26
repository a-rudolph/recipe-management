import { render, screen } from '@testing-library/react'
import QrCodeButton from './QrCodeButton'

jest.mock('styled-components', () => {
  const mock = () => () => jest.fn()
  mock.canvas = () => jest.fn()
  return {
    __esModule: true,
    default: mock,
    useTheme: jest.fn(),
  }
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('QrCodeButton', () => {
  it('renders the button', () => {
    render(<QrCodeButton />)
    const buttonElement = screen.getByText('open on mobile')
    expect(buttonElement).toBeDefined()
  })
})
