// src/utils/validation.js
export function validateUserData({ email, password }) {
  if (!email?.trim() || !password?.trim()) return "All fields are required.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format.";

  if (password.length < 6) return "Password must be at least 6 characters.";

  return ""; // ✅ No errors
}
  