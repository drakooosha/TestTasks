function startApp() {
  getData();
  async function getData() {
    let result = await fetch("https://jsonplaceholder.typicode.com/posts")
    let data = await result.json();
    
    drawTable(data);
  }

  function drawTable(data) {
    const parent = document.querySelector('body');
    const table = document.createElement('table');
    table.setAttribute('border','1px')
    table.setAttribute('cellpadding','3px')
    table.setAttribute('cellspacing','5px')
    parent.appendChild(table);
    drawRows(data, table);
  }

  function drawRows(data, table) {
    const headers = findHeaders(data);
    for (let i = -1; i < data.length; i++) {
      const row = document.createElement('tr');
      table.appendChild(row);
      i === -1 ? drawCells(headers, row, 'th') : drawCells(checkData(headers, data[i]), row, 'td');
    }
  }

  function findHeaders(data) {
    const headers = [];
    for (let element of data) {
      const elementKeys = Object.keys(element);
      for (let index in elementKeys) {
        if (headers.indexOf(elementKeys[index]) === -1) {
          headers.push(elementKeys[index]);
        }
      }
    }
    return headers;
  }

  function checkData(headers, element) {
    const correctElement = {};
    for (header of headers) {
      correctElement[header] = Object.keys(element).indexOf(header) === -1 ? '-' : element[header];
    }
    return correctElement;
  }

  function drawCells(element, row, type) {
    for (key in element) {
      const cell = document.createElement(type);
      cell.innerHTML = element[key];
      cell.style.textAlign = isNaN(Number(element[key])) ? 'left' : 'center';
      row.appendChild(cell);
    }
  }
}

startApp()