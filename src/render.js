import {
  queryAttractions,
  sortAttractions,
  loadMoreAttractions,
} from "./attractions";

const headerOrder = [
  "image",
  "name",
  "theme",
  "type",
  "cost",
  "est_cust",
  "maintenance_time",
  "workers",
  "updated_at",
];

const onLoadMore = (e) => {
  localStorage.setItem("offset", parseInt(localStorage.getItem("offset")) + 10);
  render(loadMoreAttractions(parseInt(localStorage.getItem("offset"))));
};

const onSort = (e) => {
  localStorage.setItem("sortColumn", e.target.dataset.sort);
  localStorage.setItem(
    "sortOrder",
    localStorage.getItem("sortOrder") === "asc" ? "desc" : "asc"
  );

  render(
    sortAttractions(
      localStorage.getItem("sortColumn"),
      localStorage.getItem("sortOrder"),
      parseInt(localStorage.getItem("offset"))
    ),
    true // rerender
  );
};

const onQuery = (e) => {
  localStorage.setItem("query", document.querySelector("input.query").value);

  render(
    queryAttractions(
      localStorage.getItem("query"),
      parseInt(localStorage.getItem("offset"))
    ),
    true
  );
};

const checkSortCss = (element, sort, order) => {
  if (element.dataset.sort === sort) {
    element.classList.add('active')
  }

  if (element.dataset.sort !== sort) {
    return element.classList.remove('active');
  }

  if (order === 'desc') {
    element.classList.remove('asc');
    return element.classList.add('desc')
  }

  element.classList.remove('desc');
  return element.classList.add('asc')
}

const registerEvents = () => {
  document
    .getElementById("load-more-button")
    .addEventListener("click", onLoadMore);

  const sort = window.localStorage.getItem('sortColumn')
  const order = window.localStorage.getItem('sortOrder')

  document.querySelectorAll("#attractions-table tr th").forEach((element) => {
    if (!element.dataset.sort) {
      return;
    }

    checkSortCss(element, sort, order);

    element.addEventListener("click", onSort);
  });

  document.querySelector("input.query").addEventListener("keyup", onQuery);
};

const renderRows = async (rows, rerender, afterRenderCallback = null) => {
  const tableBody = document.querySelector("#attractions-table tbody");
  const tableFooter = document.querySelector("#attractions-table tfoot tr td");
  const startPainting = performance.now();
  const loadMoreButton = document.getElementById("load-more-button");

  tableBody.classList.remove("hide");
  tableFooter.classList.add("hide");

  if (!rows.length) {
    tableBody.classList.add("hide");
    tableFooter.classList.remove("hide");

    tableFooter.innerHTML = "No results found";
    return (loadMoreButton.disabled = true);
  }

  loadMoreButton.disabled = false;

  if (rerender) {
    tableBody.innerHTML = "";
  }

  rows.forEach((rowData) => {
    const row = document.createElement("tr");

    headerOrder.forEach((colKey) => {
      const column = document.createElement("td");

      if (colKey === "image") {
        const img = document.createElement("img");
        img.setAttribute("src", "/noimage.webp");
        img.setAttribute("width", "80px");
        img.setAttribute("height", "80px");
        img.setAttribute("alt", "no image found");
        rowData[colKey] = img;
      }

      column.append(rowData[colKey]);
      row.appendChild(column);
    });

    tableBody.appendChild(row);
  });

  const finishedPainting = performance.now();

  if (afterRenderCallback) {
    afterRenderCallback();
  }

  console.debug(
    "read everything performance",
    finishedPainting - startPainting
  );
};

const render = (rows, rerender = false) => {
  renderRows(rows, rerender, registerEvents);
}

export default render;
