let freeMovie = async () => {
  let freeMovieItem = "";
  try {
    let data = await fetch("http://localhost:3000/freeMovie");
    let res = await data.json();

    freeMovieItem = res.map((item) => {
      return `<div class="slide">
      <img src="${item.src}" alt="${item.title}" className="" />
      <span>${item.title}</span>
      </div>`;
    });


    document
      .querySelector(".free-slides")
      .insertAdjacentHTML("afterbegin", freeMovieItem.join(""));
  } catch (error) {
    console.log("error");
  }
};



export default freeMovie()