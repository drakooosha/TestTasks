function create_modal() {
  const body = document.querySelector("body");
  const btn = document.querySelector(".content__btn");
  const modal = document.querySelector(".modal");
  const form = modal.querySelector(".form")
  const close = form.querySelector(".form__btn--reset");

  btn.addEventListener("click", function () {
    setTimeout(function () {
      modal.style.transform = "translatex(0)";
      body.style.overflowY = 'hidden';
      form.scrollIntoView();
    }, 200);
    
    document.addEventListener("click", function (event) {
      if (event.target == modal || event.target == close) {
        modal.style.transform = "translatex(100%)";
        body.style.overflowY = 'auto'
        form.reset();
        clearInputs();
      }
    });
  });

  function clearInputs() {
    form.querySelector('.form__input--name').classList.remove("error");
    form.querySelector('.form__input--phone').classList.remove("error");
    form.querySelector('.form__input--mail').classList.remove("error");
    form.querySelector('.form__file').style.border = "transparent";
    form.querySelector('.form__input--select').classList.remove("error");
  }
}

create_modal();