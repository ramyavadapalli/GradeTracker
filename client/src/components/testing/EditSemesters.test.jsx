import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import EditSemesters from '../EditSemesters';
import { MemoryRouter } from 'react-router-dom';

test('renders EditSemesters component and interacts with it', async () => {
  render(
    <MemoryRouter>
      <EditSemesters />
    </MemoryRouter>
  );


});
