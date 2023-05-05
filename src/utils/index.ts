export const Utils = {
  isValidEmail: (email: any) => {
    return (
      email &&
      new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$/g).test(email)
    )
  },
  isValidPhone: (value: string) => {
    return (
      value &&
      new RegExp(
        /^[+]?\d{2,}?[(]?\d{2,}[)]?[-\s.]?\d{2,}?[-\s.]?\d{2,}[-\s.]?\d{0,9}$/im
      ).test(value)
    )
  },
  isValidPassword: (password: string) => {
    return (
      password &&
      new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/).test(password)
    )
  },
}
