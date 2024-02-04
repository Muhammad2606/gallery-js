const monthNames = [
    "Jan", "Feb", "March", "April",
    "May", "June", "July", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];

const today = new Date();
const day = today.getDate();
const monthIndex = today.getMonth();
const month = monthNames[monthIndex];
const year = today.getFullYear();

console.log(`Today's date is: ${day} ${month} ${year}`);