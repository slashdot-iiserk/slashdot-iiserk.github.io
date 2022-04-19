
var prev_scroll_pos = window.pageYOffset;

// var header = this.document.querySelector(".navbar");
var element_name = '';

// ************ Wellcome to Spaghetti Land ************
// Listen I was way to sleepy and high to code this part
// Also due to different development branches created by 
// different people with different styles it has lead to this.


window.addEventListener("scroll", () => {
    if (this.window.innerWidth >= 900) {
        element_name = '.navbar';
    } else {
        element_name = '.phone-navbar';
    }
    let header = this.document.querySelector(element_name);
    console.log(element_name.concat(".sticky"));
    let curr_scroll_pos = window.pageYOffset;
    if (curr_scroll_pos <= 0) {
        header.classList.remove("sticky");
		return;
    } else {
        header.classList.add("sticky");
    }

    if (curr_scroll_pos > prev_scroll_pos) {
        document.querySelector(element_name.concat(".sticky")).style.top = "-100%";
    } else {
        document.querySelector(element_name.concat(".sticky")).style.top = "0";
    }
    prev_scroll_pos = curr_scroll_pos;

})