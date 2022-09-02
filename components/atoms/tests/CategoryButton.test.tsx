import { render, screen } from '@testing-library/react';
import CategoryButton from '../CategoryButton';
import userEvent from '@testing-library/user-event';

const CATEGORIES = {
  ALL: {
    info: {
      type: 'all',
      name: '전체',
      num: 7
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
      backgroundColor: 'rgb(255, 255, 255)'
    });
    expect(categoryButton).toHaveStyle({ color: 'rgb(34, 34, 34)' });
    expect(categoryButton).toHaveStyle({
      fontWeight: 'normal'
    });

    await userEvent.hover(categoryButton);
    expect(categoryButton).toHaveStyle({ backgroundColor: 'rgb(51, 51, 51)' });
    expect(categoryButton).toHaveStyle({ color: 'rgb(255, 255, 255)' });
    expect(categoryButton).toHaveStyle({
      fontWeight: 'bold'
    });

    await userEvent.unhover(categoryButton);
    expect(categoryButton).toHaveStyle({
      backgroundColor: 'rgb(255, 255, 255)'
    });
    expect(categoryButton).toHaveStyle({ color: 'rgb(34, 34, 34)' });
    expect(categoryButton).toHaveStyle({
      fontWeight: 'normal'
    });
  });
});
