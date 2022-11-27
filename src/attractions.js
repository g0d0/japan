import { fetchJsonAttractions, fetchTsvAttractions } from "./api";
import { merge } from "./merge";
import sortStrategy from "./sortStrategy";

let data = [];

const loadFiles = async () => {
  const [tsvData, jsonData] = await Promise.all([
    fetchTsvAttractions(),
    fetchJsonAttractions()
  ]);

  data = merge(tsvData, jsonData);
};

const queryHandler = (data, query) => {
  if (query === "") return data;
    const filtered = data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())
    );

    return filtered;
};

const sortHandler = (data, column, order, offset) => {
  const dataToDisplay = sortStrategy[column](data, column, order);
  return offsetHandler(dataToDisplay, 0, offset + 10);
};

const offsetHandler = (data, offset, limit) => {
  return data.slice(offset, limit);
};

export const queryAttractions = (query, offset = 0) => {
  let result = queryHandler(data, query);
  return offsetHandler(result, 0, offset + 10);
};

export const sortAttractions = (column, order, offset) => {
  let result = data;
  const query = localStorage.getItem("query");

  if (query) {
    result = queryHandler(result, query);
  }

  result = offsetHandler(result, 0, offset + 10);

  return sortHandler(result, column, order, offset);
};

export const loadMoreAttractions = (offset) => {
  if (localStorage.getItem("query")) {
    return queryAttractions(localStorage.getItem("query"));
  }

  return offsetHandler(data, offset, offset + 10);
};

export const loadAttractions = async () => {
  await loadFiles();
  return offsetHandler(data, 0, 10)
};
