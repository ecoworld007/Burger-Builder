export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const checkValidity = (value, rules) => {
  let isValid =true;
  if(!rules){
    return isValid;
  }
  if(rules.required){
    isValid = value.trim() !== '' && isValid;
  }
  if(rules.minLength){
    isValid = value.length >= rules.minLength && isValid;
  }
  if(rules.maxLength){
    isValid = value.length <= rules.maxLength && isValid;
  }
  if(rules.email){
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    isValid = reg.test(value) && isValid;
  }
  if(rules.numeric){
    const reg = /^\d+$/;
    isValid = reg.test(value) && isValid;
  }
  return isValid;
}