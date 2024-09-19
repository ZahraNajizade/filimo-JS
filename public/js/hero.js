let hero = async () => {
  let bgDiv = document.querySelector(".bg-div");
  let bgDiv0 = document.querySelector(".bg-div-0");

  let heroImg = [];
  try {
    let data = await fetch("../../db.json");
    let res = await data.json();

    heroImg = res.heroImage.map((item) => item.src);
    bgDiv.style.backgroundImage = "";
    bgDiv0.style.backgroundImage = "";
    let heroImgIndex = 0;


    setInterval(()=>{
        heroImgIndex = (heroImgIndex + 1) % heroImg.length; 
        bgDiv.style.backgroundImage = `url(${heroImg[heroImgIndex]})`;
        bgDiv0.style.backgroundImage = `url(${heroImg[heroImgIndex]})`;
    }, 5000);



  } catch (error) {
    console.log("error3",error); 
  }
};

export default hero();

