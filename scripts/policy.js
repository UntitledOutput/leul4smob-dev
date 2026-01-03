
function category_btn_click(element) {
  if (element.classList.contains("open")) {
    element.className = "category-box closed"
  } else {
    element.className = "category-box open"
  }
}