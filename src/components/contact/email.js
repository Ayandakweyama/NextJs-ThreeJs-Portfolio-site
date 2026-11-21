export const contactEmail = "AyandaKweyamavezi5@gmail.com";

const emailPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i;

export const contactFields = [
  { name: "name", label: "Name", min: 2, max: 80, validate: (value) => !/[\r\n]/.test(value) },
  { name: "email", label: "Email address", min: 3, max: 254, validate: (value) => emailPattern.test(value), invalid: "Enter a valid email address." },
  { name: "message", label: "Message", min: 10, max: 3000 },
];

export function validateContactField(field, value) {
  if (!value) return `${field.label} is required.`;
  if (value.length < field.min) return `${field.label} must have at least ${field.min} characters.`;
  if (value.length > field.max) return `${field.label} must have at most ${field.max} characters.`;
  if (field.validate && !field.validate(value)) return field.invalid ?? `Enter a valid ${field.label.toLowerCase()}.`;
  return true;
}
