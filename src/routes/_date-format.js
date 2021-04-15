const monthNames = {
  short: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  long: [
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
  ],
};
const dayNames = {
  short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  long: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

export default function formattedDate(inputDate) {
  if (inputDate.toString() === "Invalid Date") {
    return "";
  }
  const [month, date, year] = inputDate.toLocaleDateString("en-US").split("/");
  const day = inputDate.getDay();
  return `${dayNames["short"][day]}, ${
    monthNames["long"][month - 1]
  } ${date}, ${year}`;
}
