import createSlider from "./slider";
// let bestof = async () => {
//   let seriesButton = document.querySelector("#series-button");
//   let movieButton = document.querySelector("#movie-button");
//   let bestofItem = "";
//   let detail = ""
//   let bestofGenre= ""


//   try {
//     let data = await fetch("../../db.json");
//     let res = await data.json();

//     // detail
//     const updateDetailListeners = (item) => {
//       // let bestofMovieItemClick = document.querySelectorAll(
//       //   ".bestof-movie-click"
//       // );
//       // let bestofSeriesItemClick = document.querySelectorAll(
//       //   ".bestof-series-click"
//       // );

      
      
//         item.addEventListener("click", () => {
//           console.log("1");

//           bestofGenre = "";
//           detail = item.map((element) => {
//               bestofGenre = element.genre
//                 .map((itemGenre) => {
//                   return `<span
//                     class="py-[3px] px-[15px] bg-[#282828] rounded-[24px] min-w-[50px] block text-center">${itemGenre}</span>`;
//                 })
//                 .join("");
//               return `
//             <div class="">
//             <div class="container mb-[16px]">
//               <div class="flex flex-col">
//                 <a href="#" class="mb-[12px] text-[16px] font-[700] leading-[32px]">${element.title}</a>
//                 <div class="mb-[24px]"></div>
//                 <div class="mb-[24px] text-[#a1a1a1] font-[100] leading-[12px]">کارگردان: ${element.director}</div>
//                 <div class="gap-[8px] flex items-center mb-[24px]">
//                   ${bestofGenre}
//                 </div>
//                 <div
//                   class="mb-[24px] text-[12px] leading-[26px] max-w-[708px] whitespace-nowrap overflow-hidden text-ellipsis">${element.description}</div>
//               </div>
//               <div class="absolute left-[140px] top-0"><img src="" alt=""
//                   class="block max-h-[190px] w-full  max-w-[220px]">
//               </div>
//             </div>
//             <div class="">
//               <div class="slider bestof-slider relative">
//                 <div class="slides bestof-slides"></div>
//                 <div class="flex justify-between absolute bottom-0">
//                   <button class="prev rotate-180 w-[40px] flex justify-center items-center opacity-[0.2]">
//                     <img src="./public/image/back.webp" alt="" />
//                   </button>
//                   <button class="next w-[40px] flex justify-center items-center">
//                     <img src="./public/image/back.webp" alt="" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>`;
//             })
//             .join("");
//           document.querySelector(".bestof-detail").innerHTML = "";
//           document.querySelector(".bestof-detail").innerHTML = detail;
//         });
//     };

//     // poster
//     bestofItem = res.bestOf.bestOfSeries
//       .map((item) => {
//         return `<a class="bestof-series-click">
//                     <div class=""></div>
//                     <span class="">
//                       <img src="${item.exclusive}" alt="" />
//                     </span>
//                     <img src="${item.poster}" alt="" class="" />
//                   </a>`;
//       })
//       .join("");
//     document.querySelector(".bestof-items").innerHTML = bestofItem;
//     updateDetailListeners(item)

//     seriesButton.addEventListener("click", () => {
//       bestofItem = res.bestOf.bestOfSeries
//         .map((item) => {
//           return `<a class="bestof-series-click">
//                     <div class=""></div>
//                     <span class="">
//                       <img src="${item.exclusive}" alt="" />
//                     </span>
//                     <img src="${item.poster}" alt="" class="" />
//                   </a>`;
//         })
//         .join("");
//       document.querySelector(".bestof-items").innerHTML = "";
//       document.querySelector(".bestof-items").innerHTML = bestofItem;
//       updateDetailListeners(item);
//     });

//     movieButton.addEventListener("click", () => {
//       bestofItem = res.bestOf.bestOfMovie
//         .map((item) => {
//           return `<a class="bestof-movie-click">
//                     <div class=""></div>
//                     <span class="">
//                       <img src="${item.exclusive}" alt="" />
//                     </span>
//                     <img src="${item.poster}" alt="" class="" />
//                   </a>`;
//         })
//         .join("");
//       document.querySelector(".bestof-items").innerHTML = "";
//       document.querySelector(".bestof-items").innerHTML = bestofItem;

//       updateDetailListeners(item);
//     });
//   } catch (error) {
//     console.log("error2", error);
//   }

 
// };

let bestof = async () => {
  let seriesButton = document.querySelector("#series-button");
  let movieButton = document.querySelector("#movie-button");
  let bestofItem = "";
  let detail = "";
  let bestofGenre = "";

  try {
    let data = await fetch("../../db.json");
    let res = await data.json();

    // detail
    const updateDetailListeners = (items, type) => {
      items.forEach((element, index) => {
        element.addEventListener("click", () => {
          

          let selectedItem =
            type === "movie"
              ? res.bestOf.bestOfMovie[index]
              : res.bestOf.bestOfSeries[index];

          bestofGenre = selectedItem.genre
            .map((itemGenre) => {
              return `<span class="py-[3px] px-[15px] bg-[#282828] rounded-[24px] min-w-[50px] block text-center">${itemGenre}</span>`;
            })
            .join("");

          detail = `
              <div class="flex flex-col">
                <a href="#" class="mb-[12px] text-[16px] font-[700] leading-[32px]">${selectedItem.title}</a>
                <div class="mb-[24px]"></div>
                <div class="mb-[24px] text-[#a1a1a1] font-[100] leading-[12px]">کارگردان: ${selectedItem.director}</div>
                <div class="gap-[8px] flex items-center mb-[24px]">
                  ${bestofGenre}
                </div>
                <div class="mb-[24px] text-[12px] leading-[26px] max-w-[708px] whitespace-nowrap overflow-hidden text-ellipsis">${selectedItem.description}</div>
              </div>
              <div class="absolute left-[140px] top-0">
                <img src="${selectedItem.logo}" alt="" class="block max-h-[190px] w-full max-w-[220px]">
              </div>
            
          `;
          document.querySelector(".bestof-detail").innerHTML = detail;
          if (selectedItem.Episodes) {console.log(document.querySelector(".bestof-slides"));
          
            document.querySelector(".bestof-slides").innerHTML =
              selectedItem.Episodes.map((itemEpisode) => {
                console.log(itemEpisode.image);

                return `<div class="slide"><img src="${itemEpisode.image}" alt="" /></div>`;
              }).join("");
          }

          

          

          
       
          createSlider(".bestof-slider", {
            SpaceBetween: 20,
            DisableNavigation: true,
            slidesPerView: 4,
          });
          
        });
      });
    };

    // Render poster items
    const renderBestOfItems = (type) => {
      if (type === "movie") {
        bestofItem = res.bestOf.bestOfMovie
          .map((item) => {
            return `<a class="bestof-movie-click">
                      <div class=""></div>
                      <span class=""><img src="${item.exclusive}" alt="" /></span>
                      <img src="${item.poster}" alt="" class="" />
                    </a>`;
          })
          .join("");
      } else {
        bestofItem = res.bestOf.bestOfSeries
          .map((item) => {
            return `<a class="bestof-series-click">
                      <div class=""></div>
                      <span class=""><img src="${item.exclusive}" alt="" /></span>
                      <img src="${item.poster}" alt="" class="" />
                    </a>`;
          })
          .join("");
      }
      document.querySelector(".bestof-items").innerHTML = bestofItem;

      // Add click listeners to the newly rendered items
      const bestofItems = document.querySelectorAll(
        type === "movie" ? ".bestof-movie-click" : ".bestof-series-click"
      );
      updateDetailListeners(bestofItems, type);
    };

    // Initial render for series
    renderBestOfItems("series");

    // Event listeners for buttons
    seriesButton.addEventListener("click", () => {
      renderBestOfItems("series");
    });

    movieButton.addEventListener("click", () => {
      renderBestOfItems("movie");
    });
  } catch (error) {
    console.log("error:", error);
  }
};


export default bestof;
// bestofMovieItemClick.forEach((element) => {
      //   element.addEventListener("click", () => {
      //     detail = res.bestOf.bestOfMovie
      //       .map((item) => {
      //         return `
      //         <div class="">
      //         <div class="container mb-[16px]">
      //           <div class="flex flex-col">
      //             <a href="#" class="mb-[12px] text-[16px] font-[700] leading-[32px]">${item.title}</a>
      //             <div class="mb-[24px]"></div>
      //             <div class="mb-[24px] text-[#a1a1a1] font-[100] leading-[12px]">کارگردان: محمدحسین مهدویان</div>
      //             <div class="gap-[8px] flex items-center mb-[24px]">
      //               <span
      //                 class="py-[3px] px-[15px] bg-[#282828] rounded-[24px] min-w-[50px] block text-center">درام</span>
      //             </div>
      //             <div
      //               class="mb-[24px] text-[12px] leading-[26px] max-w-[708px] whitespace-nowrap overflow-hidden text-ellipsis">
      //               مالک آخرین برگ بازیش را رو می کند. او فاتحانه نشسته بر سریر خون، پا در مسیری می گذارد که هنوز بوی خون
      //               از آن به مشام می رسد.</div>
      //           </div>
      //           <div class="absolute left-[140px] top-0"><img src="" alt=""
      //               class="block max-h-[190px] w-full  max-w-[220px]">
      //           </div>
      //         </div>
      //         <div class="">
      //           <div class="slider bestof-slider relative">
      //             <div class="slides bestof-slides"></div>
      //             <div class="flex justify-between absolute bottom-0">
      //               <button class="prev rotate-180 w-[40px] flex justify-center items-center opacity-[0.2]">
      //                 <img src="./public/image/back.webp" alt="" />
      //               </button>
      //               <button class="next w-[40px] flex justify-center items-center">
      //                 <img src="./public/image/back.webp" alt="" />
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //       </div>`;
      //       })
      //       .join("");
      //     document.querySelector(".bestof-detail").innerHTML = "";
      //     document.querySelector(".bestof-detail").innerHTML = detail;
      //   });
      // });













      // detail
    // const updateDetailListeners = () => {
    //   let bestofMovieItemClick = document.querySelectorAll(
    //     ".bestof-movie-click"
    //   );
    //   let bestofSeriesItemClick = document.querySelectorAll(
    //     ".bestof-series-click"
    //   );

      
    //   bestofSeriesItemClick.forEach((element) => {
    //     element.addEventListener("click", () => {
    //       console.log("1");

    //       bestofGenre = "";
    //       detail = res.bestOf.bestOfSeries
    //         .map((item) => {
    //           bestofGenre = item.genre
    //             .map((itemGenre) => {
    //               return `<span
    //                 class="py-[3px] px-[15px] bg-[#282828] rounded-[24px] min-w-[50px] block text-center">${itemGenre}</span>`;
    //             })
    //             .join("");
    //           return `
    //         <div class="">
    //         <div class="container mb-[16px]">
    //           <div class="flex flex-col">
    //             <a href="#" class="mb-[12px] text-[16px] font-[700] leading-[32px]">${item.title}</a>
    //             <div class="mb-[24px]"></div>
    //             <div class="mb-[24px] text-[#a1a1a1] font-[100] leading-[12px]">کارگردان: ${item.director}</div>
    //             <div class="gap-[8px] flex items-center mb-[24px]">
    //               ${bestofGenre}
    //             </div>
    //             <div
    //               class="mb-[24px] text-[12px] leading-[26px] max-w-[708px] whitespace-nowrap overflow-hidden text-ellipsis">${item.description}</div>
    //           </div>
    //           <div class="absolute left-[140px] top-0"><img src="" alt=""
    //               class="block max-h-[190px] w-full  max-w-[220px]">
    //           </div>
    //         </div>
    //         <div class="">
    //           <div class="slider bestof-slider relative">
    //             <div class="slides bestof-slides"></div>
    //             <div class="flex justify-between absolute bottom-0">
    //               <button class="prev rotate-180 w-[40px] flex justify-center items-center opacity-[0.2]">
    //                 <img src="./public/image/back.webp" alt="" />
    //               </button>
    //               <button class="next w-[40px] flex justify-center items-center">
    //                 <img src="./public/image/back.webp" alt="" />
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>`;
    //         })
    //         .join("");
    //       document.querySelector(".bestof-detail").innerHTML = "";
    //       document.querySelector(".bestof-detail").innerHTML = detail;
    //     });
    //   });
    // };
