// let slide = document.querySelectorAll(".slide");
// let next = document.querySelector(".next");
// let prev = document.querySelector(".prev");
// let pagination = document.querySelectorAll(".pagination");
// let removeButton1 = document.querySelector(".remove-button-1");
// let removeButton2 = document.querySelector(".remove-button-2");
// let counter = 0;

slide.forEach((item, index) => {
  item.style.transform = `translatex(${index * 100}%)`;
});

function counterSlider(counter) {
  slide.forEach((item, index) => {
    item.style.transform = `translatex(${(index - counter) * 100}%)`;
  });
  // pagination
  pagination.forEach((item, index) => {
    if (index == counter) {
      pagination[index].classList.add("bg-[#fff]");
    } else {
      pagination[index].classList.remove("bg-[#fff]");
    }
  });
  // disable navigation
  if (counter == 0) {
    prev.style.opacity = 0.2;
  } else {
    prev.style.opacity = 1;
  }
  if (counter == slide.length - 1) {
    next.style.opacity = 0.2;
  } else {
    next.style.opacity = 1;
  }

  // min width 0 (button)
  if (counter == 1) {
    removeButton2.classList.add("!block");
    removeButton1.classList.add("hidden");
  } else {
    removeButton2.classList.remove("!block");
  }
  if (counter == 0 || counter == 2 || counter == 3 || counter == 4) {
    removeButton1.classList.add("!block");
  } else {
    removeButton1.classList.remove("!block");
  }
  if (counter > 4) {
    removeButton1.parentElement.classList.add("!max-h-[70px]");
  } else {
    removeButton1.parentElement.classList.remove("!max-h-[70px]");
  }
}

// navigation
next.addEventListener("click", () => {
  if (counter != slide.length - 1) {
    prev.style.opacity = 1;
    counter++;
    counterSlider(counter);
  }
});
prev.addEventListener("click", () => {
  if (counter != 0) {
    next.style.opacity = 1;
    counter--;
    counterSlider(counter);
  }
});

// pagination

[...pagination];
pagination.forEach((item, index) => {
  pagination[index].addEventListener("click", () => {
    counter = index;
    counterSlider(counter);
  });
});

function createSlider(
  selector,
  {
    pagination = false,
    disableNavigation = false,
    interval = 4000,
    autoplay = false,
    transitionSpeed = 600,
    slidesPerView = 1,
    loop = true,
    responsive = {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  }
) {

let slide = document.querySelectorAll(selector);
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let pagination = document.querySelectorAll(".pagination");
let removeButton1 = document.querySelector(".remove-button-1");
let removeButton2 = document.querySelector(".remove-button-2");
let counter = 0;



}
