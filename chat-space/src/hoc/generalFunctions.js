export const validationCheck = (
  userDetails,
  userData,
  submit,
  isExistingEmail,
  isInValid
) => {
  const existingEmail = userDetails?.userDetails?.filter(
    (e, i) => e.email === userData?.email
  );
  if (userData?.email.includes("@") && !existingEmail?.length) {
    submit();
  } else if (existingEmail?.length) {
    isExistingEmail();
  } else {
    isInValid();
  }
};
