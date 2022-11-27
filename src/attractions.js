import { fetchJsonAttractions, fetchTsvAttractions } from "./api";
import { merge } from "./merge";
import sortStrategy from "./sortStrategy";

let arr1 = await fetchTsvAttractions();
let arr2 = await fetchJsonAttractions();
const data = merge(arr1, arr2);

const queryHandler = (data, query) => {
  console.debug("Searching: ", query);
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
  console.debug("Ordering: ", { column, order, offset });
  const dataToDisplay = sortStrategy[column](data, column, order);
  return offsetHandler(dataToDisplay, 0, offset + 10);
};

const offsetHandler = (data, offset, limit) => {
  console.debug("Cutting list: ", { offset, limit });
  return data.slice(offset, limit);
};

export const queryAttractions = (query, offset = 0) => {
  console.debug("Searching attractions: ", { query, offset });
  // we need to offset it as well
  let result = queryHandler(data, query);
  return offsetHandler(result, 0, offset + 10);
};

export const sortAttractions = (column, order, offset) => {
  console.debug("Sorting attractions...");
  let result = data;
  const query = localStorage.getItem("query");

  if (query) {
    result = queryHandler(result, query);
  }

  result = offsetHandler(result, 0, offset + 10);

  return sortHandler(result, column, order, offset);
};

export const loadMoreAttractions = (offset) => {
  console.debug("Loading more attractions...");
  if (localStorage.getItem("query")) {
    return queryAttractions(localStorage.getItem("query"));
  }

  return offsetHandler(data, offset, offset + 10);
};

export const loadAttractions = () => offsetHandler(data, 0, 10);
