import createSlider from "./slider";
let bestof = async () => {
  let freeMovieItem = "";
  try {
    let data = await fetch("http://localhost:3000/bestOf");
    let res = await data.json(); 

    freeMovieItem = res.map((item) => {
      return ``;
    });

    document
      .querySelector(".bestof-slides")
      .insertAdjacentHTML("afterbegin", freeMovieItem.join(""));

    createSlider(".bestof-slider", {
      SpaceBetween: 20,
      DisableNavigation: true,
      slidesPerView: 4,
    });
  } catch (error) {
    console.log("error2", error);
  }
};

export default bestof;
