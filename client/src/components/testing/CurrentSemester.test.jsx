
import React from 'react';
import { render } from '@testing-library/react';
import CurrentSemester from "../CurrentSemester/CurrentSemester";
import { MemoryRouter } from 'react-router-dom';

test('renders CurrentSemester component and interacts with it', async () => {
  render(
    <MemoryRouter>
      <CurrentSemester />
    </MemoryRouter>
  );

});