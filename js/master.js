// Toggle Spin Class On Icon 
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    // Toggle Class fa-span For Rotation On Self 
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box 
    document.querySelector(".settings-box").classList.toggle("open");
}
//////////////////////////////////////////////////////////////////////////////////////
//check
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));

    document.querySelectorAll(".colors-list li").forEach(function (ele) {
        ele.classList.remove("active");

        if (ele.dataset.color === mainColors) {
            ele.classList.add("active");
        }
    });
}


// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(function (li) {
    li.addEventListener("click", function (e) {
        // e.target.parentElement.querySelectorAll(".active").forEach(function (ele) {
        //     ele.classList.remove("active");
        // })
        // e.target.classList.add("active");
        handleActive(e);

        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        localStorage.setItem("color_option",e.target.dataset.color);

    });
});

// Random Background Option
let backgroundOption = true;
//Variable To Control The Background Interval
let backgroundInterval;

// Check If There Is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        backgroundOption = true;
    }else {
        backgroundOption = false;
    }

    document.querySelectorAll(".random-backgrounds span").forEach(function (ele) {
        ele.classList.remove("active");
    });

    if (backgroundLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

};


// Switch Random Background Option
const randomBackgroundElement = document.querySelectorAll(".random-backgrounds span");

randomBackgroundElement.forEach(function (span) {
    span.addEventListener("click", function (e) {
        // e.target.parentElement.querySelectorAll(".active").forEach(function (ele) {
        //     ele.classList.remove("active");
        // })
        // e.target.classList.add("active");
        handleActive(e);

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs ();
            localStorage.setItem("background_option", true);

        }else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});
   
//////////////////////////////////////////////////////////////////
// Select Landing Page Element 
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Imgs
function randomizeImgs () {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(function() {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // Change Background Image Url 
            landingPage.style.backgroundImage = "url('images/" + imgsArray[randomNumber]+"')";
        }, 3000);
    }
}
randomizeImgs ();

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.scrollY;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(function (skill) {
            skill.style.width = skill.dataset.progress;
        });
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(function (img) {
    img.addEventListener("click", function (e) {

        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            let imageHeading = document.createElement("h3");
            let imageText = document.createTextNode(img.alt);
            imageHeading.appendChild(imageText);
            popupBox.appendChild(imageHeading)
        }

        let popupImage = document.createElement("img");
        popupImage.src = img.src;

        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton);
    });
});

//Close Popup
document.addEventListener("click", function (e) {
    if (e.target.className === "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

// allBullets.forEach(function (bullet) {
//     bullet.addEventListener("click", function (e) {
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: "smooth"
//         });
//     });
// });

//////////////////////////////////////////////////////////////////////////////////
// Select All links
let allLinks = document.querySelectorAll(".landing-page .links a");

// allLinks.forEach(function (link) {
//     link.addEventListener("click", function (e) {

//         e.preventDefault();

//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: "smooth"
//         });
//     });
// });


function scrollToSection (element) {
    element.forEach(function (ele) {
        ele.addEventListener("click", function (e) {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

scrollToSection(allBullets);
scrollToSection(allLinks);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Handle Active State
function handleActive (ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(function (ele) {
        ele.classList.remove("active");
    })
    ev.target.classList.add("active");
}

////////////////////////////////////////////////////////////////////////////////////////////


// Show Bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

// Check If There Is Local Storage Random Background Item
let bulletLocalItem = localStorage.getItem("bullet_option");

if (bulletLocalItem !== null) {

    document.querySelectorAll(".bullets-option span").forEach(function (span) {
        span.classList.remove("active");
    });

    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display ="none";
        
        document.querySelector(".bullets-option .no").classList.add("active");
    }

};

bulletsSpan.forEach(function (span) {
    span.addEventListener("click", function (e) {

        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";

            localStorage.setItem("bullet_option", "block");
        } else {
            bulletsContainer.style.display ="none";

            localStorage.setItem("bullet_option", "none");
        }

        handleActive(e);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////
//Reset Button
document.querySelector(".reset-options").onclick = function () {
    localStorage.clear();
    window.location.reload();
}

///////////////////////////////////////////////////////////////////////////
//Toggle Mnue
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links")

toggleBtn.onclick = function () {
    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open");

    e.stopPropagation();
}

// Click AnyWhere Outside Menu And Toggle Button
document.addEventListener("click", function (e) {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        // Check If Menu Is Open
        if (tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open");
        }
    }
});

// Stop Propagation on Menu
tLinks.onclick = function (e) {
    e.stopPropagation();
}

///////////////////////////////////////////////////////////////////////
// Up Button
let upButton = document.querySelector(".up");

// window.onscroll = function () {
//     if (this.scrollY >= innerHeight) {
//         upButton.style.display = "block";
//     }else {
//         upButton.style.display = "none";
//     }
// };

// upButton.onclick = function () {
//     window.scrollTo({
//         left: 0,
//         top: 0,
//         behavior: "smooth",
//     })
// };



