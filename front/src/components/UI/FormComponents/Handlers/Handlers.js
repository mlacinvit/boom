export const inputChangeHandler = (e, setState) => {
  const { name, value } = e.target;
  return setState(prev => ({ ...prev, [name]: value }));
};

export const submitFormHandler = (e, fetch) => {
  e.preventDefault();
  return fetch;
};

export const fileChangeHandler = (e, setState) => {
  const name = e.target.name;
  const file = e.target.files[0];

  setState(prevState => ({...prevState, [name]: file}));
};

export const submitFormDataHandler = (e, myState) => {
  e.preventDefault();
  const formData = new FormData();
  
  Object.keys(myState).forEach(key => {
    formData.append(key, myState[key]);
  });

  return formData;
};