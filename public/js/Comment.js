let comment = async () => {
  let commentItem = "";
  try {
    let data = await fetch("http://localhost:3000/Comments");
    let res = await data.json();

    commentItem = res.map((item) => {
      return `<div class="p-[24px] border-[#33353d] border-solid border-[1px] rounded-[12px] bg-[#ffffff05]">
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
  } catch (error) {
    console.log("error");
  }
};

export default comment();
