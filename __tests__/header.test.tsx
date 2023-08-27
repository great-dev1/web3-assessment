import React from 'eact';
import { render, fireEvent } from '@testing-library/react';
import { HeaderMegaMenu } from './HeaderMegaMenu';

describe('HeaderMegaMenu', () => {
  it('should render connect kit button with correct mode', () => {
    const { getByRole } = render(<HeaderMegaMenu />);
    const connectKitButton = getByRole('button');

    expect(connectKitButton).toHaveClass('connect-kit-button');
    expect(connectKitButton).toHaveClass('light-mode');

    const { colorScheme } = useMantineColorScheme();

    fireEvent.click(connectKitButton);

    expect(connectKitButton).toHaveClass(`connect-kit-button-${colorScheme}`);
  });

  it('should open wallet connect modal when connect kit button is clicked', () => {
    const { getByRole } = render(<HeaderMegaMenu />);
    const connectKitButton = getByRole('button');

    expect(connectKitButton).toHaveClass('connect-kit-button');
    expect(connectKitButton).toHaveClass('light-mode');

    fireEvent.click(connectKitButton);

    const walletConnectModal = getByRole('dialog');

    expect(walletConnectModal).toBeInTheDocument();
  });
});
