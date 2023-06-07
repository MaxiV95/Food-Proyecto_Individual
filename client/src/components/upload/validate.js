const regexUrl =
  /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;

const regexTitle = /^[A-Z_ ]+$/i;

const validate = (form) => {
  const tempErrors = {};

  if (!regexTitle.test(form.title))
    tempErrors.title = "Special characters and numbers are not allowed";

  if (form.healthScore < 0 || 100 < form.healthScore)
    tempErrors.healthScore = "Score must be between 0 and 100";

  if (!regexUrl.test(form.image)) tempErrors.image = "Must be a URL";

  if (!Object.values(form.diets).includes(true)) tempErrors.diets = "Please choose at least one diet";

  return tempErrors;
};

export default validate;
