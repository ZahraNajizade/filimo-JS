let menu = async () => {
  let menuItem = "";
  let submenuItem = "";
  let arrowDown = ""
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

export default menu;
