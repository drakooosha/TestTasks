async function startApp() {
  const data = await getData();
  const body = document.querySelector('body');
  const input = drawInput(body);
  const trArr = drawTable(data, body);

  addThListener(trArr,data); //Передаю весь массив trArr т.к. в дальнейшем я оттуда достану заголовки
  addInputListener(input, trArr.slice(1), data); //передаю массив без 1-го элемента т.к. мне заголовки не нужны

  async function getData() { //получаю данные
    let result = await fetch("https://jsonplaceholder.typicode.com/posts")
    let data = await result.json();
    return data;
  }

  function drawInput(body) { //вставляю input
    const input = document.createElement('input');
    input.setAttribute('type','search');
    body.appendChild(input);
    return input;
  }

  function addInputListener(input,trArr,data) {// Функция слушателей для th и логики во время печати
    input.addEventListener('input', event => {
      if(event.target.value.length > 3) {
        const filteredData = filterData(data);
        updateTable(filteredData, trArr);
        for(let index in trArr) {
          trArr[index].style.display = index < filteredData.length ? "table-row" : "none"; 
        }
      }
      else {
        return 
      }
    })
  }

  function drawTable(data, body) { //функция отрисовывает таблицу и возвращает массив строк
    const table = document.createElement('table');
    table.setAttribute('border', '1px')
    table.setAttribute('cellpadding', '3px')
    table.setAttribute('cellspacing', '5px')
    body.appendChild(table);

    return drawRows(data, table);

    function drawRows(data, table) {
      const headers = findHeaders(data);
      const trArr =  [];
      for (let i = -1; i < data.length; i++) {
        const row = document.createElement('tr');
        table.appendChild(row);
        trArr.push(row);
        i === -1 ? drawCells(headers, row, 'th') : drawCells(checkData(headers, data[i]), row, 'td');
      }
      return trArr;
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

  function addThListener(trArr,data) { //Функция слушателей для th и логики после нажатия
    const thArr = trArr[0].querySelectorAll('th');

    thArr.forEach(th => {
      let sortType = 'Asc';
      
      th.addEventListener('click', event => {
        const filteredData = filterData(data);
        filteredData.sort((elem, nextElem) => {
          return sortType === "Asc" ? sortAsc(elem, nextElem, event.target.innerHTML) : sortDesc(elem, nextElem, event.target.innerHTML);
        })
        sortType = sortType === "Asc" ? "Desc" : "Asc";
        updateTable(filteredData, trArr.slice(1))
      })
    });

    function sortAsc(elem, nextElem, key) {
      if (elem[key] < nextElem[key]) {
        return -1;
      }
      if (elem[key] > nextElem[key]) {
        return 1;
      }
      return 0;
    }
  
    function sortDesc(elem, nextElem, key) {
      if (elem[key] > nextElem[key]) {
        return -1;
      }
      if (elem[key] < nextElem[key]) {
        return 1;
      }
      return 0;
    }
  }

  function updateTable(newData, trArr) { //Заменянем значение td
    for(let indexData in newData) {
      const rowTdArr = trArr[indexData].querySelectorAll('td');
      for(let indexArr in rowTdArr) {
        rowTdArr[indexArr].innerHTML = Object.values(newData[indexData])[indexArr];
      }
    }
  }

  function filterData(data) {  //фильтруем дату по наличии подстроки в объекте(elem)
    return filteredData = data.filter(elem => Object.values(elem).join().indexOf(input.value) !== -1).slice(0);
  }
}

startApp();