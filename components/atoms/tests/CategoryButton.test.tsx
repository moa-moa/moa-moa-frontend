import { render, screen } from '@testing-library/react';
import CategoryButton from '../CategoryButton';
import userEvent from '@testing-library/user-event';

const CATEGORIES = {
  ALL: {
    info: {
      id: -1,
      name: '전체',
      num: 7,
      selected: {
        category: {
          id: -1,
          name: '전체',
          backColor: '#333333'
        },
        setCategory: jest.fn()
      }
    },
    style: {
      backColor: '#333333'
    }
  }
};

describe('<CategoryButton>', () => {
  it('Button has text called "전체"', async () => {
    render(
      <CategoryButton
        info={CATEGORIES['ALL'].info}
        style={CATEGORIES['ALL'].style}
      />
    );

    const categoryButton = screen.getByText(/전체/);
    expect(categoryButton).toBeInTheDocument();
    expect(categoryButton).toHaveTextContent('전체 (7)');
    expect(categoryButton).toHaveStyle({
      color: 'rgb(255, 255, 255)'
    });
    expect(categoryButton).toHaveStyle({
      fontWeight: 'bold'
    });
    expect(categoryButton).toHaveStyle({ backgroundColor: 'rgb(51, 51, 51)' });

    await userEvent.hover(categoryButton);
    expect(categoryButton).toHaveStyle({ opacity: 0.7 });

    await userEvent.unhover(categoryButton);
    expect(categoryButton).toHaveStyle({
      opacity: 1
    });
  });
});
