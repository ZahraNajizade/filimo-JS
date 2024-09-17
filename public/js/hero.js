let hero = async () => {
  let bgDiv = document.querySelector(".bg-div");
  let heroImg = [];
  try {
    let data = await fetch("http://localhost:3000/heroImage");
    let res = await data.json();

    heroImg = res.map((item) => item.src);
    console.log(heroImg);
    bgDiv.style.backgroundImage = "";
    let heroImgIndex = 0;


    setInterval(()=>{
        heroImgIndex = (heroImgIndex + 1) % heroImg.length; 
        console.log(heroImgIndex);
        bgDiv.style.backgroundImage = `url(${heroImg[heroImgIndex]})`;
    }, 5000);


    changeHeroImage();
  } catch (error) {
    console.error("error"); 
  }
};

export default hero();

