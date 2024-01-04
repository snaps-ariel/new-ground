import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '@/app/(afterLogin)/home/page';

describe('Home Component', () => {
  it('renders the "Home" text', () => {
    const { getByText } = render(<HomePage />);

    const homeElement = getByText('Home~~~~!!!');

    expect(homeElement).toBeInTheDocument();
  });
});
