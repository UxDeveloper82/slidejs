let sliderMax = 0;
let slideWidth = 0;
let sliderLeft = 0;
const minHorizontalRatio = 400 / 600;

const addImages = () => {
    const images = ["images2", "images1", "volcano", "peak", "river", "wheel", "img7"];
    const imageSlide = document.getElementById("imageSlide");

    for (let i in images) {
        const img = document.createElement("img");
        img.src = `images/${images[i]}.jpg`;
        imageSlide.appendChild(img);
    }

    setTimeout(() => {
        const imageSlideImages = document.querySelectorAll("#imageSlide img");

        imageSlideImages.forEach(img => {
            slideWidth += img.width + 26;
        });

        slideWidth += 40;
        imageSlide.style.width = `${slideWidth}px`;
        sliderMax = document.getElementById("selector").offsetWidth - slideWidth;
    }, 1000);
};

addImages();

const slide = (value) => {
    const oldLeft = sliderLeft;
    sliderLeft = sliderLeft + value;

    if (sliderLeft >= 0) {
        sliderLeft = 0;
    }

    if (sliderLeft <= sliderMax) {
        sliderLeft = sliderMax;
    }

    if (oldLeft !== sliderLeft) {
        const imageSlide = document.getElementById("imageSlide");

        imageSlide.style.transition = "left 0.3s linear";
        imageSlide.style.left = `${sliderLeft}px`;

        setTimeout(() => {
            slide(value);
        }, 300);
    }

    return false;
};

const setPhoto = function () {
    const newPhoto = this.src;
    const horizontal = minHorizontalRatio > this.height / this.width;
    const photoImg = document.querySelector("#photo img");

    photoImg.style.transition = "none";
    photoImg.style.opacity = 0.1;

    setTimeout(() => {
        photoImg.src = newPhoto;

        if (horizontal) {
            photoImg.style.width = "600px";
            photoImg.style.height = "auto";
        } else {
            photoImg.style.width = "auto";
            photoImg.style.height = "400px";
        }

        photoImg.style.transition = "opacity 0.5s linear";
        photoImg.style.opacity = 1;
    }, 500);

    return false;
};

document.addEventListener("DOMContentLoaded", () => {
    addImages();

    const leftButton = document.getElementById("left");
    const rightButton = document.getElementById("right");
    const imageSlide = document.getElementById("imageSlide");
    const imageSlideImages = document.querySelectorAll("#imageSlide img");

    leftButton.addEventListener("mouseenter", () => {
        slide(50);
    });

    leftButton.addEventListener("mouseleave", () => {
        imageSlide.style.transition = "none";
        return false;
    });

    rightButton.addEventListener("mouseenter", () => {
        slide(-50);
    });

    rightButton.addEventListener("mouseleave", () => {
        imageSlide.style.transition = "none";
        return false;
    });

    imageSlideImages.forEach(img => {
        img.addEventListener("mouseenter", () => {
            img.style.transition = "height 0.5s, opacity 0.5s";
            img.style.height = "120px";
            img.style.opacity = 1;
            return false;
        });

        img.addEventListener("mouseleave", () => {
            img.style.transition = "height 0.5s, opacity 0.5s";
            img.style.height = "100px";
            img.style.opacity = 0.5;
            return false;
        });

        img.addEventListener("click", setPhoto);
    });

    imageSlideImages[0].click();
});
