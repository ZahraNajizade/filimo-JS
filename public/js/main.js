// slider
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

// accordion
let accordion = document.querySelectorAll(".accordion");
let rotatePlus = document.querySelectorAll(".rotate-plus");
let answer = document.querySelectorAll(".answer");

accordion.forEach((item, index) => {
  item.addEventListener("click", () => {
    // باز و بسته کردن محتوای کلیک شده
    if (answer[index].style.display === "block") {
      rotatePlus[index].style.transform = "rotate(45deg)";
      rotatePlus[index].style.transition = "transform 0.3s ease-out";
      answer[index].style.display = "none";
      item.style.color = "#fff";
    } else {
      rotatePlus[index].style.transform = "rotate(0deg)";
      rotatePlus[index].style.transition = "transform 0.3s ease-out";
      answer[index].style.display = "block";
      item.style.color = "#f4843f";
    }
  });
});

// bestof
let bestof = async () => {
  let seriesButton = document.querySelector("#series-button");
  let movieButton = document.querySelector("#movie-button");
  let bestofItem = "";
  let detail = "";
  let bestofGenre = "";

  try {
    let data = await fetch('./db.json');
    let res = await data.json();

    function updateDetail(items, element, type, index) {
      let selectedItem =
        type === "movie"
          ? res.bestOf.bestOfMovie[index]
          : res.bestOf.bestOfSeries[index];

      element.style.opacity = "1";
      element.style.transform = "scale(1.1)";
      element.style.border = "2px solid rgba(255, 255, 255, 0.7)";
      element.style.borderRadius = "10px";

      items.forEach((item) => {
        if (item != element) {
          item.style.opacity = "0.65";
          item.style.transform = "scale(1)";
          item.style.border = "none";
          item.style.borderRadius = "0px";
        }
      });

      document.querySelector(
        ".bestof-bg"
      ).style.background = `url('${selectedItem.bg}') no-repeat`;
      document.querySelector(".bestof-bg").style.backgroundSize = "cover";

      bestofGenre = selectedItem.genre
        .map((itemGenre) => {
          return `<span class="py-[3px] px-[15px] bg-[#282828] rounded-[24px] min-w-[50px] block text-center">${itemGenre}</span>`;
        })
        .join("");

      detail = `
              <div class="flex flex-col ml-[10px]">
                <a href="#" class="mb-[12px] text-[16px] font-[700] leading-[32px]">${selectedItem.title}</a>
                <div class="mb-[24px]"></div>
                <div class="mb-[24px] text-[#a1a1a1] font-[100] leading-[12px]">کارگردان: ${selectedItem.director}</div>
                <div class="gap-[8px] flex items-center mb-[24px]">
                  ${bestofGenre}
                </div>
                <div class="mb-[24px] text-[12px] leading-[26px] max-w-[708px] whitespace-nowrap overflow-hidden text-ellipsis">${selectedItem.description}</div>
              </div>
              <div class="absolute left-[140px] top-0">
                <img src="${selectedItem.logo}" alt="" class="block max-h-[190px] w-full max-w-[220px] ">
              </div>
            
          `;
      document.querySelector(".bestof-detail").innerHTML = detail;
      if (selectedItem.Episodes) {
        console.log(document.querySelector(".bestof-slides"));

        document.querySelector(".bestof-slides").innerHTML =
          selectedItem.Episodes.map((itemEpisode) => {
            console.log(itemEpisode.image);
            if (!itemEpisode.free) {
              return `<div class="slide">
        <div class=" relative mb-[8px] rounded-[10px] overflow-hidden h-[180px]">
        <div class="pt-[57.6%]"></div>
          <img src="${itemEpisode.image}" alt="" class="h-full w-full absolute inset-0" />
          <div class="absolute bg-[rgba(0,0,0,0.4)] backdrop-blur-[5px] inset-[-4px]"></div>
          <span
            class="absolute rounded-[50%] bg-[rgba(0,0,0,0.4)] backdrop-blur-[14px] w-[48px] h-[48px] flex items-center justify-center left-[calc(50%-24px)] top-[calc(50%-24px)]">
            <img src="./public/image/icon-lock.png" alt="" class="w-[50%]">
          </span>
        </div>
        <div class="text-[11px] text-[#f6f6f6] leading-[15px] font-[700]">${itemEpisode.title}</div>
      </div>`;
            } else {
              return `<div class="slide">
        <div class=" relative mb-[8px] rounded-[10px] overflow-hidden h-[180px]">
          <div class="pt-[57.6%]"></div>
          <img src="${itemEpisode.image}" alt="" class="h-full w-full absolute inset-0" />
          <div class="flex justify-between items-center w-full absolute p-[10px] bottom-0 z-[10]">
          <div
            class="flex items-center gap-[4px] px-[8px] py-[4px] bg-[#1d2b1f]  text-[#4dab56] rounded-[24px]">
            <span class="block ">
              <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 16 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12.6667 13.3333H3.33337C2.80294 13.3333 2.29423 13.1226 1.91916 12.7475C1.54409 12.3724 1.33337 11.8637 1.33337 11.3333V4.66663C1.33337 4.13619 1.54409 3.62749 1.91916 3.25241C2.29423 2.87734 2.80294 2.66663 3.33337 2.66663H12.6667C13.1971 2.66663 13.7058 2.87734 14.0809 3.25241C14.456 3.62749 14.6667 4.13619 14.6667 4.66663V11.3333C14.6667 11.8637 14.456 12.3724 14.0809 12.7475C13.7058 13.1226 13.1971 13.3333 12.6667 13.3333ZM2.86197 4.19522C2.73695 4.32025 2.66671 4.48981 2.66671 4.66663V11.3333C2.66671 11.5101 2.73695 11.6797 2.86197 11.8047C2.98699 11.9297 3.15656 12 3.33337 12H12.6667C12.8435 12 13.0131 11.9297 13.1381 11.8047C13.2631 11.6797 13.3334 11.5101 13.3334 11.3333V4.66663C13.3334 4.48981 13.2631 4.32025 13.1381 4.19522C13.0131 4.0702 12.8435 3.99996 12.6667 3.99996H3.33337C3.15656 3.99996 2.98699 4.0702 2.86197 4.19522ZM9.62005 8.66663L7.33338 10.1466C7.20743 10.23 7.0612 10.2776 6.91031 10.2843C6.75941 10.291 6.60954 10.2565 6.4767 10.1846C6.34387 10.1128 6.23307 10.0061 6.15616 9.87611C6.07925 9.74612 6.03911 9.59767 6.04004 9.44663V6.49996C6.03911 6.34892 6.07925 6.20047 6.15616 6.07048C6.23307 5.94049 6.34387 5.83384 6.4767 5.76195C6.60954 5.69005 6.75941 5.65561 6.91031 5.66231C7.0612 5.669 7.20743 5.71659 7.33338 5.79996L9.62005 7.26663C9.737 7.34218 9.83316 7.44582 9.89975 7.5681C9.96634 7.69038 10.0012 7.8274 10.0012 7.96663C10.0012 8.10586 9.96634 8.24288 9.89975 8.36516C9.83316 8.48744 9.737 8.59108 9.62005 8.66663Z"
                  fill="#18A456"></path>
              </svg>
            </span>
            <span class="block text-[#4dab56]">رایگان</span>
          </div> 
          <div class="bg-[rgba(0,0,0,0.4)] px-[8px] py-[4px] text-[1.1rem]  text-[#e3e3e3] backdrop-blur-[14px] rounded-[8px]">${itemEpisode.time}</div>

          </div>
          
        </div>
        <div class="text-[11px] text-[#f6f6f6] leading-[15px] font-[700]">${itemEpisode.title}</div>
      </div>`;
            }
          }).join("");
      }

      createSlider(".bestof-slider", {
        SpaceBetween: 20,
        DisableNavigation: true,
        slidesPerView: 4,
      });
    }

    // detail
    const updateDetailListeners = (items, type) => {
      items.forEach((element, index) => {
        element.addEventListener("click", () => {
          updateDetail(items, element, type, index);
        });
      });
    };

    // Render poster items
    const renderBestOfItems = (type) => {
      if (type === "movie") {
        bestofItem = res.bestOf.bestOfMovie
          .map((item) => {
            return `<a class="bestof-movie-click relative mb-[8px]">
                      <div class=""></div>
                      <span class="absolute opacity-[0.65] bottom-[8px] flex justify-center z-[5] w-full"><img src="${item.exclusive}" alt="" /></span>
                      <img src="${item.poster}" alt="" class="rounded-[8px]" />
                    </a>`;
          })
          .join("");
      } else {
        bestofItem = res.bestOf.bestOfSeries
          .map((item) => {
            return `<a class="bestof-series-click relative mb-[8px]">
                      <div class=""></div>
                      <span class="absolute opacity-[0.65] bottom-[8px] flex justify-center z-[5] w-full"><img src="${item.exclusive}" alt="" /></span>
                      <img src="${item.poster}" alt="" class="rounded-[8px]" />
                    </a>`;
          })
          .join("");
      }
      document.querySelector(".bestof-items").innerHTML = bestofItem;

      // Add click listeners to the newly rendered items
      const bestofItems = document.querySelectorAll(
        type === "movie" ? ".bestof-movie-click" : ".bestof-series-click"
      );
      updateDetail(bestofItems, bestofItems[0], type, 0);
      updateDetailListeners(bestofItems, type);
    };

    // Initial render for series
    renderBestOfItems("series");

    // Event listeners for buttons
    seriesButton.addEventListener("click", () => {
      renderBestOfItems("series");
      seriesButton.style.background = "rgba(255,255,255,.12)";
      movieButton.style.background = "transparent";
    });

    movieButton.addEventListener("click", () => {
      renderBestOfItems("movie");
      seriesButton.style.background = "transparent";
      movieButton.style.background = "rgba(255,255,255,.12)";
    });
  } catch (error) {
    console.log("error:", error);
  }
};

// comment
let comment = async () => {
  let commentItem = "";
  try {
    let data = await fetch("./db.json");
    let res = await data.json();

    commentItem = res.Comments.map((item) => {
      return `<div class="p-[24px] slide comment-slide border-[#33353d] border-solid border-[1px] rounded-[12px] bg-[#ffffff05]">
                      <div class="flex justify-between items-center mb-[16px]">
                        <div class="flex items-center gap-[8px]">
                          <img src="../image/person.png" alt="person" />
                          <span class="text-[#959ba2] font-[400] text-[14px]">
                            ${item.name}
                          </span>
                        </div>
                        <div class="">
                          <img src="../image/virgol.png" alt="virgol" />
                        </div>
                      </div>
                      <div class="mb-[16px] overflow-hidden overflow-y-auto h-[75px] text-[#f9f9f9] leading-[18px] font-[400] text-[11px]">
                        ${item.body}
                      </div>
                    </div>`;
    });
    document
      .querySelector(".comment-slides")
      .insertAdjacentHTML("afterbegin", commentItem.join(""));

    createSlider(".comment-slider", {
      SpaceBetween: 10,
      slidesPerView: 3,
      DisableNavigation: true,
    });
  } catch (error) {
    console.log("error1", error);
  }
};

// freeMovie
let freeMovie = async () => {
  let freeMovieItem = "";
  let freeMovieItem0 = "";
  try {
    let data = await fetch("./db.json");
    let res = await data.json();

    freeMovieItem = res.freeMovie.map((item) => {
      return `<div class="slide free-slide">
      <div class="flex items-center gap-[4px] px-[8px] py-[4px] bg-[#1d2b1f] absolute top-[4px] right-[8px] z-[2] text-[#4dab56] rounded-[24px]">
      <span class="block ">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6667 13.3333H3.33337C2.80294 13.3333 2.29423 13.1226 1.91916 12.7475C1.54409 12.3724 1.33337 11.8637 1.33337 11.3333V4.66663C1.33337 4.13619 1.54409 3.62749 1.91916 3.25241C2.29423 2.87734 2.80294 2.66663 3.33337 2.66663H12.6667C13.1971 2.66663 13.7058 2.87734 14.0809 3.25241C14.456 3.62749 14.6667 4.13619 14.6667 4.66663V11.3333C14.6667 11.8637 14.456 12.3724 14.0809 12.7475C13.7058 13.1226 13.1971 13.3333 12.6667 13.3333ZM2.86197 4.19522C2.73695 4.32025 2.66671 4.48981 2.66671 4.66663V11.3333C2.66671 11.5101 2.73695 11.6797 2.86197 11.8047C2.98699 11.9297 3.15656 12 3.33337 12H12.6667C12.8435 12 13.0131 11.9297 13.1381 11.8047C13.2631 11.6797 13.3334 11.5101 13.3334 11.3333V4.66663C13.3334 4.48981 13.2631 4.32025 13.1381 4.19522C13.0131 4.0702 12.8435 3.99996 12.6667 3.99996H3.33337C3.15656 3.99996 2.98699 4.0702 2.86197 4.19522ZM9.62005 8.66663L7.33338 10.1466C7.20743 10.23 7.0612 10.2776 6.91031 10.2843C6.75941 10.291 6.60954 10.2565 6.4767 10.1846C6.34387 10.1128 6.23307 10.0061 6.15616 9.87611C6.07925 9.74612 6.03911 9.59767 6.04004 9.44663V6.49996C6.03911 6.34892 6.07925 6.20047 6.15616 6.07048C6.23307 5.94049 6.34387 5.83384 6.4767 5.76195C6.60954 5.69005 6.75941 5.65561 6.91031 5.66231C7.0612 5.669 7.20743 5.71659 7.33338 5.79996L9.62005 7.26663C9.737 7.34218 9.83316 7.44582 9.89975 7.5681C9.96634 7.69038 10.0012 7.8274 10.0012 7.96663C10.0012 8.10586 9.96634 8.24288 9.89975 8.36516C9.83316 8.48744 9.737 8.59108 9.62005 8.66663Z" fill="#18A456"></path>
</svg>
      </span>
      <span class="block text-[#4dab56]">رایگان</span>
    </div>
      <img src="${item.src}" alt="${item.title}" class="rounded-[10px] mb-[8px]" />
      <span>${item.title}</span>
      </div>`;
    });

    document
      .querySelector(".free-slides")
      .insertAdjacentHTML("afterbegin", freeMovieItem.join(""));

    createSlider(".free-slider", {
      SpaceBetween: 30,
      DisableNavigation: true,
      slidesPerView: 6,
    });

    // 0

    freeMovieItem0 = res.freeMovie.map((item) => {
      return `<a href="#" class="mb-[8px]"><img src="${item.src}" alt="" class="rounded-[4px] w-[90px] m1:w-[105px]"></a>`;
    });

    document
      .querySelector(".free-movie-0")
      .insertAdjacentHTML("afterbegin", freeMovieItem0.join(""));
  } catch (error) {
    console.log("error2", error);
  }
};

// hero
let hero = async () => {
  let bgDiv = document.querySelector(".bg-div");
  let bgDiv0 = document.querySelector(".bg-div-0");

  let heroImg = [];
  try {
    let data = await fetch("./db.json");
    let res = await data.json();

    heroImg = res.heroImage.map((item) => item.src);
    bgDiv.style.backgroundImage = "";
    bgDiv0.style.backgroundImage = "";
    let heroImgIndex = 0;

    setInterval(() => {
      heroImgIndex = (heroImgIndex + 1) % heroImg.length;
      bgDiv.style.backgroundImage = `url(${heroImg[heroImgIndex]})`;
      bgDiv0.style.backgroundImage = `url(${heroImg[heroImgIndex]})`;
    }, 5000);
  } catch (error) {
    console.log("error3", error);
  }
};

// menu
let menu = async () => {
  let menuItem = "";
  let submenuItem = "";
  let arrowDown = "";
  try {
    let data = await fetch("../../db.json");
    let res = await data.json();

    menuItem = res.menu.map((item) => {
      submenuItem = "";
      arrowDown = "";
      if (item.submenu.length > 0) {
        arrowDown = `<span class=""><svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10"><defs><g id="ui-icon-arrow_down_ios" viewBox="0 0 24 24"><path d="M12 17a1 1 0 0 1-.73-.32l-7.5-8A1 1 0 1 1 5.23 7.32L12 14.54l6.77-7.22a1 1 0 1 1 1.46 1.36l-7.5 8A1 1 0 0 1 12 17Z"></path></g></defs><g fill="#FFFFFF"><path d="M12 17a1 1 0 0 1-.73-.32l-7.5-8A1 1 0 1 1 5.23 7.32L12 14.54l6.77-7.22a1 1 0 1 1 1.46 1.36l-7.5 8A1 1 0 0 1 12 17Z"></path></g></svg></span>`;
        submenuItem = item.submenu
          .map((element) => {
            return `
          <li class="w-[50%] menu-hover"><a href="#" class="py-[10px] px-[7px] block ">${element}</a></li>
          `;
          })
          .join("");
      }

      return `
      <li class="ml-[32px] relative menu-hover">
                  <a href="#" class="gap-[4px] py-[14px] flex items-center text-[1.1rem]">
                    <span class="">${item.icon}</span>
                    <span class="">${item.menuItem}</span>
                    ${arrowDown}
                  </a>
                  <div class="absolute submenu-hover bg-[#1a1a1a] top-[45px] right-0 rounded-[5px] min-w-[333px] hidden">
                    <ul class="flex flex-wrap">
                      ${submenuItem}
                    </ul>
                  </div>
                </li>
      `;
    });

    document
      .querySelector(".menu-items")
      .insertAdjacentHTML("afterbegin", menuItem.join(""));

    // // اضافه کردن هاور
    // document.querySelector(".menu-hover").addEventListener("mouseenter", () => {
    //   button.style.color = "#f9ad03";
    // });

    // // حذف هاور
    // document.querySelector(".menu-hover").addEventListener("mouseleave", () => {
    //   button.style.color = "#fff";
    // });
  } catch (error) {
    console.log("error2", error);
  }
};

// min width 0
createSlider(".slider-0", { Pagination: true, DisableNavigation: true });
comment;
hero;
freeMovie();
menu();
bestof();
