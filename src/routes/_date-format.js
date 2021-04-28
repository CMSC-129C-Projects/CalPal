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

export function formattedDate(inputDate) {
  if (inputDate.toString() === "Invalid Date") {
    return "";
  }
  const [month, date, year] = inputDate.toLocaleDateString("en-US").split("/");
  const day = inputDate.getDay();
  return `${dayNames["short"][day]}, ${
    monthNames["long"][month - 1]
  } ${date}, ${year}`;
}

// Returns an object containing the `date` and `time` fields.
// Both fields are strings. If the date is invalid,
// both the `date` and `time` fields will be the empty string.
// If the input date object doesn't have an included time,
// Only the `date` field will have a value, and `time` will
// remain an empty string.
export function getDateAndTimeStringsFromDate(date) {
  if (date.toString() === "Invalid Date") {
    return { date: "", time: "" };
  } else {
    const dateTimeStrings = {
      year: date.getFullYear(),
      month: (date.getMonth() + 1).toString().padStart(2, "0"),
      date: date.getDate().toString().padStart(2, "0"),
      hours: date.getHours().toString().padStart(2, "0"),
      minutes: date.getMinutes().toString().padStart(2, "0"),
    };
    const dateString = `${dateTimeStrings.year}-${dateTimeStrings.month}-${dateTimeStrings.date}`;
    const timeString = `${dateTimeStrings.hours}:${dateTimeStrings.minutes}`;

    if (date.toISOString().split("T").length === 1) {
      return {
        date: dateString,
        time: "",
      };
    } else {
      return {
        date: dateString,
        time: timeString,
      };
    }
  }
}
