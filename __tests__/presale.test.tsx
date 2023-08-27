import React from 'eact';
import { render, fireEvent } from '@testing-library/react';
import { Presale } from './Presale';

describe('Presale', () => {
  it('should render the component', () => {
    const { getByText } = render(<Presale />);
    expect(getByText('Overview')).toBeInTheDocument();
    expect(getByText('Token Details')).toBeInTheDocument();
    expect(getByText('Pool Details')).toBeInTheDocument();
    expect(getByText('Sale live')).toBeInTheDocument();
  });

  it('should render the connect kit button when wallet is not connected', () => {
    const { getByRole } = render(<Presale />);
    const connectKitButton = getByRole('button');
    expect(connectKitButton).toBeInTheDocument();
    expect(connectKitButton).toHaveTextContent('Connect Wallet');
  });

  it('should render the wallet balance when wallet is connected', () => {
    const { getByText } = render(<Presale />);
    const connectKitButton = getByText('Connect Wallet');
    fireEvent.click(connectKitButton);
    expect(getByText('Balance')).toBeInTheDocument();
    expect(getByText('No wallet')).not.toBeInTheDocument();
  });

  it('should render the sale button when wallet is connected', () => {
    const { getByRole } = render(<Presale />);
    const connectKitButton = getByRole('button');
    fireEvent.click(connectKitButton);
    const saleButton = getByRole('button', { name: 'Buy' });
    expect(saleButton).toBeInTheDocument();
  });

  it('should render the transaction pending message when sale is loading', () => {
    const { getByText } = render(<Presale />);
    const connectKitButton = getByText('Connect Wallet');
    fireEvent.click(connectKitButton);
    const saleButton = getByRole('button', { name: 'Buy' });
    fireEvent.click(saleButton);
    expect(getByText('Transaction pending...')).toBeInTheDocument();
  });

  it('should render the transaction success message when sale is successful', () => {
    const { getByText } = render(<Presale />);
    const connectKitButton = getByText('Connect Wallet');
    fireEvent.click(connectKitButton);
    const saleButton = getByRole('button', { name: 'Buy' });
    fireEvent.click(saleButton);
    expect(getByText('Transaction success')).toBeInTheDocument();
  });
});
