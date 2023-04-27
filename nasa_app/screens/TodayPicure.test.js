import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import TodayPicture from './TodayPicture';
import { fetchDailyPicture } from '../api/NasaApi';

jest.mock('../api/NasaApi');

describe('TodayPicture', () => {
  test('renders daily picture on success', async () => {
    const { getByAccessibilityLabel, getByTestId } = render(<TodayPicture />);

    expect(getByTestId('loading-indicator')).toBeTruthy();

    await waitFor(() => {
      expect(getByTestId('daily-picture')).toBeTruthy();
    });

    fireEvent.press(getByAccessibilityLabel('View daily picture'));
    expect(getByTestId('zoom-card')).toBeTruthy();
  });

  test('renders error message on failure', async () => {
    fetchDailyPicture.mockRejectedValueOnce(new Error('Failed to fetch daily picture'));

    const { getByText } = render(<TodayPicture />);

    await waitFor(() => {
      expect(getByText('Failed to fetch daily picture')).toBeTruthy();
    });
  });
});
describe('Placeholder', () => {
    test('placeholder', () => {
      expect(true).toBeTruthy();
    });
  });