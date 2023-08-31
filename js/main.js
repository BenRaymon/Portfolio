emailjs.init('k9WxJCQVmWam_yGDh');

// Stick Navbar
// window.onscroll = function () {
//     let sticky = $(".menu").height() + 50;

//     if (window.scrollY > sticky) {
//         $(".menu").addClass("navbar-fixed");
//     } else {
//         $(".menu").removeClass("navbar-fixed");
//     }
// };


// Initialize Owl Carousel
$('.owl-carousel').owlCarousel({
    loop: true,
    nav: true,
    dots: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    responsive: {
        0: {
            items: 1
        }
    }
});


/* Send Email - Contact Form */
async function sendEmail(formElement) {
    let res = await emailjs.sendForm('service_xl0wobg', 'template_q4xfwvm', formElement);
    console.log(res);
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const formElement = $('#contactform')[0];
    const formData = new FormData(formElement);

    let valid = true;
    for (const item of formData.entries()) {
        valid = validateInputs(item[0], item[1]) ? valid : false;
    }

    if (valid) {
        await sendEmail(formElement);
        formElement.reset();
    }
}

function validateInputs(key, value) {
    let valid = true;
    switch (key) {
        case 'user_name':
            valid = isNotWhiteSpace(value);
            addValidation(key, valid);
            break;
        case 'user_email':
            valid = isValidEmail(value);
            addValidation(key, valid);
            break;
    }
    return valid;
}

function isNotWhiteSpace(text) {
    let hasEverything = /\S/.test(text) && text !== undefined && text !== null;
    if (typeof text === "object") {
        if (text.size === 0) {
            hasEverything = false;
        }
    }
    return hasEverything;
}

function isValidEmail(email) {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(email);
}

function addValidation(fieldId, isValid) {
    if (!isValid) {
        $(`#${fieldId}`).addClass('is-invalid');
    } else {
        $(`#${fieldId}`).removeClass('is-invalid');
    }
}

$('#submit-message').on('click', (event) => { handleFormSubmit(event); });


// const data = {
//     "biztext": {
//         title: 'BizText',
//         description: "Biztext is a ...",
//         skills: ['Angular 14', 'TypeScript', 'NodeJS', 'Express', 'Firebase', 'Twilio', 'HTML', 'CSS', 'Bootstrap', 'DigitalOcean'],
//         images: ['./assets/laptop_biztext.png', './assets/laptop_biztext2.png'],
//         siteLink: 'https://biztext.online',
//         githubLink: 'https://github.com/BenRaymon'
//     },
//     "delawareaepi": {
//         title: 'Delaware AEPi',
//         description: "Delaware AEPi is a ...",
//         skills: ['Angular 14', 'TypeScript', 'Firebase', 'HTML', 'CSS', 'Bootstrap', 'GitHub Pages'],
//         images: ['./assets/delawareaepi.jpg', './assets/delawareaepi_philanthropy.jpg', './assets/delawareaepi_history.jpg'],
//         siteLink: 'https://delawareaepi.com',
//         githubLink: 'https://github.com/DelawareAEPI/delawareaepi.github.io'
//     }
// }

// $('#open-modal').on('click', () => {
//     populateProjectModal('biztext');
// });


// $('#biztext').on('click', () => {
//     populateProjectModal('biztext');
// });

// $('#delawareaepi').on('click', () => {
//     populateProjectModal('delawareaepi');
// });

// function populateProjectModal(project) {

//     /* Carousel Content */
//     let indicatorsHTML = '';
//     let imagesHTML = '';

//     for (let [i, img] of data[project].images.entries()) {
//         // Carousel Indicators
//         indicatorsHTML += ` <button type="button" data-bs-target="#carouselExampleIndicators"
//             data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i + 1}"></button>`;
//         // Carousel Images
//         imagesHTML += ` <div class="carousel-item ${i == 0 ? 'active' : ''}">
//             <img src="${img}" class="d-block w-100" alt="...">
//         </div>`;
//     }

//     $('.carousel-indicators').html(indicatorsHTML);
//     $('.carousel-inner').html(imagesHTML);


//     /* Footer / Main Content */
//     let footerHTML = '';
//     // Project Content
//     footerHTML += `
//     <div class="project-content">
//         <h3 class="title">${data[project].title}</h3>
//         <p class="description">${data[project].description}</p>
//         <div class="skills">
//             ${data[project].skills.reduce((updated, latest) =>
//         updated.concat(`<div class='skill small'>${latest}</div>`), '')}
//         </div>
//     </div> `;

//     // Modal Buttons
//     footerHTML += ` <div class="modal-buttons d-flex flex-row"> `;
//     if (data[project]?.siteLink){
//         footerHTML += `<a class="secondary-btn btn-xsmall" href="${data[project].siteLink}" 
//             target="_blank"> Visit Site <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
//     }
//     if (data[project]?.githubLink){
//         footerHTML +=  `<a class="secondary-btn btn-xsmall" href="${data[project].githubLink}"
//             target="_blank" > View Source Code <i class="fa-brands fa-github"></i></a>`;
//     }
//     footerHTML += `
//         <a class="secondary-btn btn-xsmall" id='close-modal' data-bs-dismiss="modal">
//         Close <i class="fa-solid fa-xmark"></i></a>
//     </div>`;

//     $('.modal-footer').html(footerHTML);

// }

