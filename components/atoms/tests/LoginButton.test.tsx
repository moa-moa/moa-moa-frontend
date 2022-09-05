import { render, screen } from '@testing-library/react';
import LoginButton from '../LoginButton';

describe('<LoginButton/>', () => {
  it('Render LoginButton without  error', () => {
    render(<LoginButton />);
  });

  it('LoginButton is anchor tag and must have link', () => {
    render(<LoginButton />);
    const loginButton = screen.getByRole('link');

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent('골라라 구글 계정으로 로그인');
    expect(loginButton.getAttribute('href')).toBe('/moamoa/auth/google');
  });
});
