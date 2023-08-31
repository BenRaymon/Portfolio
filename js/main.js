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