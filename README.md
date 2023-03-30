Данный код выведет 4 раза слово "Bad" в силу того, анонимные функции замкнут в себе i, но выполниться код этих функций только после того, как освободить call stack. И всё бы ничего, можно этот код выполнить и попозже, но переменная var перезаписывается, соответственно, когда call stack освободиться(отработает весь for) и будет выполняться функция колбэк - значения i будет равно 4, и с этим значением отработают все анонимные функции, которые создадутся => arr[4] будет undefined => под капотом сработает неявное преобразование и Number(undefined) будет равен NaN => условие получится
NaN > 13 ? => false и => 4 раза "Bad"
Чтобы это исправить:  
1. Исправить var i на let i. let имеет блочную область видимости и, тем самым, i на каждой итерации создастся для каждой функции отдельно
2. обернуть setTimeout в анонимную функцию и вызывать её на месте. Т.е.
(function(index)(
  setTimeout(function() {
    console.log(arr[index] > 13 ? ...)
  })
))(i)
При вызове функции в параметр index скопируется значение i  и теперь функция, внутри setTimeout, напрямую от i зависеть не будет.
И первый и второй способ возможны из-за механизма, под название, "замыкания"
P.S. От к-ва миллисекунд, которые мы напишем во внутрь setTimeout ничего не измениться.Даже если прописать 0. Это объясняется с помощью ivent loop
P.P.S. А ещё точнее - в дополнение к "Bad" выведется undefined т.к. анонимные функции ничего не возвращают(нету return)