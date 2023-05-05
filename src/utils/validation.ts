export const AuthValidate = {
  isValidEmail: (email: string) => {
    return (
      email &&
      new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$/g).test(email)
    );
  },
};
