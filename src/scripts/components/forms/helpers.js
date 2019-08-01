import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

export const ClubsSelect = (clubs) =>
  clubs.map((club) => (
    <MenuItem key={club.id} value={club.id}>
      {club.name}
    </MenuItem>
  ));
