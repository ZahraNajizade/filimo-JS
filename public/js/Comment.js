import createSlider from "./slider";
let comment = async () => {
  let commentItem = "";
  try {
    let data = await fetch("../../db.json");
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
      DisableNavigation: true,
      slidesPerView: 3,
    });
  } catch (error) {
    console.log("error1", error);
  }
};

export default comment();
