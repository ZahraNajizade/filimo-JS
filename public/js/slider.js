

function createSlider(
  selector,
  {
    Pagination = false,
    DisableNavigation = false,
    SpaceBetween = 0,
    interval = 4000,
    autoplay = false,
    transitionSpeed = 600,
    slidesPerView = 1,
    loop = false,
    responsive = {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  }
) {
  let x = selector + " .slide";
  let slide = document.querySelectorAll(x);
  x = selector + " .next";
  let next = document.querySelector(x);
  x = selector + " .prev";
  let prev = document.querySelector(x);
  x = selector + " .pagination";
  let pagination = document.querySelectorAll(x);
  let removeButton1 = document.querySelector(".remove-button-1");
  let removeButton2 = document.querySelector(".remove-button-2");
  let counter = 0;

  slide.forEach((item, index) => {
 
    item.style.marginLeft = `${SpaceBetween}px`;
    item.style.width = `calc( (100% / ${slidesPerView}) - ${SpaceBetween}px)`;

        // item.style.marginLeft = `${SpaceBetween}px`;
        // item.style.width = `calc(${
        //   (item.parentElement.parentElement.clientWidth /
        //     slidesPerView /
        //     item.parentElement.parentElement.clientWidth) *
        //   100
        // }%)`;

  });


 if (slide.length >= slidesPerView) {
   slide[0].parentElement.style.width = `calc(100% /
    ${slidesPerView} * ${slide.length})`;
 } else {
   slide[0].parentElement.style.width = `100%`;
 }

  




  
  

  function counterSlider(counter) {
    // slide.forEach((item, index) => {
    //   item.style.transform = `translatex(calc(${(index - counter) * 100}% + ${
    //     SpaceBetween * (index - counter)
    //   }px))`;
    // });

    // slide.forEach((item, index) => {
    //   item.style.transform = `translatex(calc(${(index - counter) * 100}% + ${
    //     SpaceBetween * (index - counter)
    //   }px))`;
    // });


      slide[0].parentElement.style.transform = `translateX(calc(100% /
    ${slide.length} * ${counter})`;


    


    // pagination
    if (Pagination) {
      pagination.forEach((item, index) => {
        if (index == counter) {
          pagination[index].classList.add("bg-[#fff]");
        } else {
          pagination[index].classList.remove("bg-[#fff]");
        }
      });
    }

    // disable navigation
    if (DisableNavigation) {
      if (counter == 0) {
        prev.style.opacity = 0.2;
      } else {
        prev.style.opacity = 1;
      }
      if (counter == slide.length - 1 - (slidesPerView - 1)) {
        next.style.opacity = 0.2;
      } else {
        next.style.opacity = 1;
      }
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

  // loop



  // navigation
  next.addEventListener("click", () => {
    if (counter != slide.length - 1 - (slidesPerView - 1)) {
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

  if (Pagination) {
    [...pagination];
    pagination.forEach((item, index) => {
      pagination[index].addEventListener("click", () => {
        counter = index;
        counterSlider(counter);
      });
    });
  }
}

export default createSlider
