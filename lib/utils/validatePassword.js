// strong password
const MIN_PASSWORD_LENGTH = 8; // Minimum password length required

const strongPasswordRegex = new RegExp(
  // This regex requires at least one uppercase, one lowercase, and one digit in any order
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
);
export const validatePassword = (password) => {
  return (
    password.length >= MIN_PASSWORD_LENGTH && strongPasswordRegex.test(password)
  );
};
