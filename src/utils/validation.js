export const validateForm = (data) => {
    let errors = {};

    const nameRegex = /^[A-Za-z]{1,26}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if(!nameRegex.test(data.firstName)){
        errors.firstName = "Only alphabets , max 26 chars";
    }

    if(!nameRegex.test(data.lastName)){
        errors.lastName = "Only alphabets , max 26 chars";
    }

    if(!emailRegex.test(data.email)){
        errors.email = "Invalid email format";
    }

    if(!mobileRegex.test(data.mobile)){
        errors.mobile = "Enter 10 digit number";
    }

    return errors;
}