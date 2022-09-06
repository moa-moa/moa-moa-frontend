import { render, screen } from '@testing-library/react';
import CategoryButton from '../CategoryButton';
import userEvent from '@testing-library/user-event';

const CATEGORIES = {
  ALL: {
    info: {
      id: -1,
      name: '전체',
      num: 7,
      isActive: false
    },
    style: {
      backColor: '#333333'
    }
  }
};

describe('<CategoryButton>', () => {
  it('Button has text called "전체"', async () => {
    const { rerender } = render(
      <CategoryButton
        info={CATEGORIES['ALL'].info}
        style={CATEGORIES['ALL'].style}
        onClick={jest.fn()}
      />
    );

    const categoryButton = screen.getByText(/전체/);
    expect(categoryButton).toBeInTheDocument();
    expect(categoryButton).toHaveTextContent('전체 (7)');
    expect(categoryButton).toHaveStyle({
      color: 'rgb(34, 34, 34)'
    });
    expect(categoryButton).toHaveStyle({
      fontWeight: 'normal'
    });
    expect(categoryButton).toHaveStyle({
      backgroundColor: 'rgb(255, 255, 255)'
    });

    await userEvent.hover(categoryButton);
    expect(categoryButton).toHaveStyle({ opacity: 0.7 });

    await userEvent.unhover(categoryButton);
    expect(categoryButton).toHaveStyle({
      opacity: 1
    });

    await userEvent.click(categoryButton);
    rerender(
      <CategoryButton
        info={{ ...CATEGORIES['ALL'].info, isActive: true }}
        style={CATEGORIES['ALL'].style}
        onClick={jest.fn()}
      />
    );
    expect(categoryButton).toHaveStyle({
      color: 'rgb(255, 255, 255)'
    });
    expect(categoryButton).toHaveStyle({
      fontWeight: 'bold'
    });
    expect(categoryButton).toHaveStyle({
      backgroundColor: 'rgb(51, 51, 51)'
    });
  });
});
