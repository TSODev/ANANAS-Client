import * as _ from "lodash";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const capitalize = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const removeStringFromStart = (fullstring, remove) =>
  fullstring.replace(remove, "");

export const fullname = (firstname, lastname) => {
  const first = capitalize(firstname);
  const last = capitalize(lastname);
  return first.concat(" ").concat(last);
};

export const isGlobalAdmin = (loggedUserRoles) => {
  return _.intersection(loggedUserRoles, ["ADMIN"]).length > 0;
};

export const isLocalAdmin = (loggedUserRoles) => {
  return _.intersection(loggedUserRoles, ["LOCALADMIN"]).length > 0;
};

export const userHasThisRole = (user, role) => {
  return _.intersection(user.roles, [role]).length > 0;
};

export const switchUserRole = (user, role) => {
  let newUserRoles = [...user.roles];
  if (userHasThisRole(user, role)) {
    newUserRoles = user.roles.filter((r) => r !== role);
  } else {
    user.roles.push(role);
    newUserRoles = [...user.roles];
  }
  return newUserRoles;
};

export const userFilter = (user, filter) => {
  return (
    user.firstname.toUpperCase().includes(filter.toUpperCase()) ||
    user.lastname.toUpperCase().includes(filter.toUpperCase()) ||
    user.company.toUpperCase().includes(filter.toUpperCase())
  );
};

export const filterUserByChips = (user, chips) => {
  if (chips.length === 0) {
    return true;
  }
  let userIsEligible = false;

  chips.forEach((chip) => {
    const userIsEligibleforThisChip =
      isIncludedIn(chip.content, user.firstname) ||
      isIncludedIn(chip.content, user.lastname) ||
      isIncludedIn(chip.content, user.company);

    userIsEligible = userIsEligible || userIsEligibleforThisChip;
  });
  return userIsEligible;
};

const isIncludedIn = (text, content) => {
  //    console.log('Is ', content , ' contains ', text , '? ');
  const result = content.toUpperCase().includes(text.toUpperCase());
  //    console.log(result);
  return result;
};

export const buildAxiosErrorMessage = (error) => {
  let message = error.message;
  if (error.message.response !== undefined) {
    message = message + " : " + error.message.response.data;
    //        message.concat(" : ").concat(error.message.response.data);
  }
  return message;
};
