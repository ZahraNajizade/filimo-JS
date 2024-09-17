accordion

document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;

    // بستن سایر بخش‌های باز
    document.querySelectorAll(".accordion-content").forEach((item) => {
      if (item !== content) {
        item.style.display = "none";
      }
    });

    // باز و بسته کردن محتوای کلیک شده
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});
