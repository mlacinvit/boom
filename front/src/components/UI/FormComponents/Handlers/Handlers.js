import { apiUrl } from "../../../../config";

export const inputChangeHandler = (e, setState) => {
  const { name, value } = e.target;
  return setState(prev => ({ ...prev, [name]: value }));
};

export const submitFormHandler = (e, fetch) => {
  e.preventDefault();
  return fetch;
};

export const fileChangeHandler = (e, setState, preview) => {
  const name = e.target.name;
  const file = e.target.files[0];

  setState(prevState => ({...prevState, [name]: file}));

  if (preview) {
    preview(URL.createObjectURL(file));
  }
};

export const submitFormDataHandler = (e, myState) => {
  e.preventDefault();
  const formData = new FormData();
  
  Object.keys(myState).forEach(key => {
    formData.append(key, myState[key]);
  });

  return formData;
};

export const imageСonverterHandler = obj => {
  let imageConvert;
  if (obj?.image) {
    if (obj?.image.match(/http/) || obj?.image.match(/https/)) {
      imageConvert = obj?.image;
    } else if (obj?.image.includes('fixtures')) {
      imageConvert = `${apiUrl}/${obj?.image}`;
    } else {
      imageConvert = `${apiUrl}/${obj?.image}`;
    }
  }
  return imageConvert; 
};