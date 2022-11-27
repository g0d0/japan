const stringSort = (data, column, order) => {
  return data.sort((row1, row2) => {
    return order === "asc"
      ? row1[column].localeCompare(row2[column])
      : row2[column].localeCompare(row1[column]);
  });
};

const numberSort = (data, column, order) => {
  return data.sort((row1, row2) => {
    return order === "asc"
      ? row1[column] - row2[column]
      : row2[column] - row1[column];
  });
};

const dateSort = (data, column, order) => {
  return data.sort((row1, row2) => {
    const row1Date = new Date(row1[column]);
    const row2Date = new Date(row2[column]);

    return order === "asc" ? row1Date - row2Date : row2Date - row1Date;
  });
};

const sortType = {
  name: stringSort,
  theme: stringSort,
  type: stringSort,
  cost: numberSort,
  est_cust: numberSort,
  maintenance_time: numberSort,
  workers: numberSort,
  updated_at: dateSort,
};

export default sortType;
