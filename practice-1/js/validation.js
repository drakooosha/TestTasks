function checkSubmit() {
  const submit = document.querySelector('.form__btn--submit');
  const form = document.querySelector('.form');

  submit.addEventListener('click', event => {
    event.preventDefault();
    const name = form.querySelector('.form__input--name');
    const phone = form.querySelector('.form__input--phone');
    const mail = form.querySelector('.form__input--mail');
    const file = form.querySelector('.form__input--file');
    const select = form.querySelector('.form__input--select');
  
    if(!checkName(name)) return;
    if(!checkPhone(phone)) return;
    if(!checkMail(mail)) return;
    if(!checkFile(file)) return;
    if(!checkArea(select)) return;

    form.submit();
  })

  function checkName(name) {
    if(!name.value || !(/^[а-яА-яёЁ\s#]{3,20}$/).test(name.value)){
      name.classList.add("error");
      return scrollTop(); 
    } 
    else {
      name.classList.remove("error");
      return true
    }
  }

  function checkPhone(phone) {
    if(!phone.value || !(/^\+\d{1} \d{3} \d{3}-\d{2}-\d{2}$/).test(phone.value)) {
      phone.classList.add("error");
      return scrollTop();
    }
    else {
      phone.classList.remove("error");
      return true;
    } 
  }

  function checkMail(mail){
    if(!mail.value || !(/^[a-zA-z\d]{4,}@[a-zA-z]{3,6}(\.[a-zA-z\d]{2,3}){1,}$/).test(mail.value)) {
      mail.classList.add("error");
      return scrollTop();
    }
    else {
      mail.classList.remove("error");
      return true;
    }
  }

  function checkFile(file) {
    let fileName = file.value;
    const fileParent = document.querySelector('.form__file');
    if(fileName.split('.').reverse()[0] !== 'png' && fileName.split('.').reverse()[0] !== 'jpeg') {
      fileParent.style.border = "2px solid red";
      return scrollTop();
    }
    else {
      fileParent.style.border = "transparent";
      return true;
    }
  }

  function checkArea(select) {
    if(!select.value) {
      select.classList.add("error");
      return scrollTop();
    }
    else {
      select.classList.remove("error");
      return true;
    }
  }

  function scrollTop() {
    form.scrollIntoView();
    return false;
  }
}

checkSubmit();