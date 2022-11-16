export const regexValidateEmail = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

// export const regexValidateName = new RegExp(/^[a-zA-ZÀ-ÿ\s]{1,40}$/);
export const regexValidateName = new RegExp(/^[a-zA-ZÀ-ÿ\s]{3,40}$/);

// export const regexValidatePassword = new RegExp(/^[a-zA-Z0-9]{8,16}$/);
export const regexValidatePassword = new RegExp(/^[a-zA-Z0-9]{8,50}$/);

// export const regexValidateTagName = new RegExp(/^[a-zA-Z0-9]{1,16}$/);
export const regexValidateTagName = new RegExp(/^[a-zA-Z]{1,16}$/);

// export const regexValidateBio = new RegExp(/^[a-zA-Z0-9]{1,160}$/);
export const regexValidateBio = new RegExp(/^[a-zA-Z0-9]{40,400}$/);

/**
 * OPTIONAL
 */
export const regexValidateProfileImage = new RegExp(
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
);
