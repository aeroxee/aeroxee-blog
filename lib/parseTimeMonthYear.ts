export default function parseTimeToMonthYear(date: string) {
  const dateFromMongoDB = new Date("2024-03-08T12:34:56.789Z");

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
  const month = monthNames[dateFromMongoDB.getMonth()];

  const year = dateFromMongoDB.getFullYear();

  // Tampilkan hasil
  return `${month} ${year}`;
}
