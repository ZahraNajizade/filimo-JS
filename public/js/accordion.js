// let question = async () => {
//   let questionItem = "";
//   try {
//     let data = await fetch("http://localhost:3000/questions");
//     let res = await data.json();

//     questionItem = res.map((item) => {
//       return `<div
//                 class="slide-button p-[16px] mb-[8px] bg-[#ffffff05] border-[#33353d] border-[1px] border-solid rounded-[12px] overflow-hidden"
//               >
//                 <div class="flex justify-between">
//                   <span class="text-[1.3rem] font-[500]">
//                     آیا می‌توانم فیلم‌های موجود در فیلیمو را دانلود کنم؟</span
//                   >
//                   <span class="">
//                     <svg
//                       xmlns:xlink="http://www.w3.org/1999/xlink"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       width="14"
//                       height="14"
//                     >
//                       <defs>
//                         <g id="ui-icon-close" viewBox="0 0 24 24">
//                           <path
//                             d="M13.41 12l6.3-6.29a1 1 0 1 0-1.42-1.42L12 10.59 5.71 4.29A1 1 0 0 0 4.29 5.71L10.59 12l-6.3 6.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L12 13.41l6.29 6.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42Z"
//                           ></path>
//                         </g>
//                       </defs>
//                       <g fill="#FF9800">
//                         <path
//                           d="M13.41 12l6.3-6.29a1 1 0 1 0-1.42-1.42L12 10.59 5.71 4.29A1 1 0 0 0 4.29 5.71L10.59 12l-6.3 6.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L12 13.41l6.29 6.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42Z"
//                         ></path>
//                       </g>
//                     </svg>
//                   </span>
//                 </div>
//                 <div
//                   class="leading-[23px] text-[1.2rem] text-[#b6b6b6] pt-[8px]"
//                 >
//                   بله، شما می‌توانید همه فیلم‌ و سریال‌های فیلیمو را داخل خود
//                   اپلیکیشن فیلیمو دانلود کنید و برای زمان‌هایی که اینترنت ندارید
//                   یا در سفر، هواپیما و قطار آ‌ن‌ها را تماشا کنید. برای دانلود هم
//                   از طریق رایانه و هم از طریق خود اپلیکیشن فیلیمو می‌توانید
//                   اقدام‌کنید. برای جزییات بیشتر می‌توانید فیلم‌های آموزشی مربوط
//                   به

//                   <a href="#" class="text-[#fdc13c] font-[500]">
//                     دانلود از طریق سایت
//                   </a>
//                   و
//                   <a href="#" class="text-[#fdc13c] font-[500]">
//                     دانلود از طریق اپلیکیشن </a
//                   >را تماشا کنید.
//                 </div>
//               </div>`;
//     });
//     document
//       .querySelector(".question")
//       .insertAdjacentHTML("afterbegin", questionItem.join(""));
//   } catch (error) {
//     console.log("error1", error);
//   }
// };

// export default question();










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


export default accordion
