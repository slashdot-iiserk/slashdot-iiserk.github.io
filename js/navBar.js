var prev_scroll_pos = window.pageYOffset;
var header = this.document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    let curr_scroll_pos = window.pageYOffset;
    if (curr_scroll_pos <= 0) {
        header.classList.remove("sticky");
		return;
    } else {
        header.classList.add("sticky");
    }

    if (curr_scroll_pos > prev_scroll_pos) {
        document.querySelector(".navbar.sticky").style.top = "-100px";
    } else {
        document.querySelector(".navbar.sticky").style.top = "0";
    }
    prev_scroll_pos = curr_scroll_pos;
})