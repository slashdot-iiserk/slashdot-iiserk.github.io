window.addEventListener("scroll",function () {
    var header = this.document.querySelector(".navbar");
    header.classList.toggle("sticky", this.window.scrollY > 0);
})