const validate = (val, rules) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case "isEmail":
                isValid = isValid && emailValidator(val);
                break;
            case "minLength":
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;

            case "maxLength":
                isValid = isValid && maxLengthValidator(val,rules[rule]);
                break;
            case  "isName":
                isValid = isValid && nameValidator(val,rules[rule]);
                break;
            case "isPhoneNo":
                isValid = isValid && phoneNoValidator(val,rules[rule]);
                break;

                 case "equalTo":
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;

            default:
                isValid = true;
        }
    }
    return isValid;
};
//email
const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        val
    );
};

//password and numbers
const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

//Hight And Wieght

const maxLengthValidator=(val,maxLength)=>{
    return val.length <= maxLength;
};

//name
const nameValidator = val => {
    return /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_\s]*$/.test(val);

};
    const phoneNoValidator = val =>{
        return   /^[0-9A-Za-z\s\-+.;(),\/*#]+$/.test(val);

    };
    const equalToValidator = (val, checkValue) => {
    return val === checkValue;
};

export default validate;