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

  const isPasswordCorrect = existingEmail?.[0]?.password === userData?.password
  if (userData?.email.includes("@") && !existingEmail?.length) {
    submit();
  } else if (existingEmail?.length && isPasswordCorrect) {
    isExistingEmail(existingEmail);
  } else {
    isInValid();
  }
};
