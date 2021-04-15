const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function formattedDate(inputDate) {
  const [month, date, year] = inputDate.toLocaleDateString("en-US").split("/");
  return `${monthNames[month - 1]} ${date}, ${year}`;
}
