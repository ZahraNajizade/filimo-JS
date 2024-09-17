let hero = async () => {
  let bgDiv = document.querySelector(".bg-div");
  let heroImg = [];
  try {
    let data = await fetch("http://localhost:3000/heroImage");
    let res = await data.json();

    heroImg = res.map((item) => item.src);
    bgDiv.style.backgroundImage = "";
    let heroImgIndex = 0;


    setInterval(()=>{
        heroImgIndex = (heroImgIndex + 1) % heroImg.length; 
        bgDiv.style.backgroundImage = `url(${heroImg[heroImgIndex]})`;
    }, 5000);



  } catch (error) {
    console.log("error3",error); 
  }
};

export default hero();

