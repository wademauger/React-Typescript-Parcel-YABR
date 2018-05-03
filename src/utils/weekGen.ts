const MDYtoDate = (M, D, Y) => (new Date(`${M}/${D}/${Y}`));

/**
 * @param startDate  the Date of the sunday at the beginning of the week
 * @param rolloverLimit  the number at which the current month ends, where the next month should begin
 * @returns Array<Date>  a 7 element array of Date objects, representing the gregorian calendar week
 */
export const weekGen = (startDate: Date, rolloverLimit = -1) => {
  const week = [];
  const sundaysDate = startDate.getDate();
  let thisDate = sundaysDate;
  for (let i = sundaysDate ; i < (sundaysDate + 7) ; i++) {
    let thisMonth = startDate.getMonth();
    let thisYear = startDate.getYear();
    if (thisDate == (rolloverLimit + 1)) {
      thisMonth += 1;
      thisDate -= rolloverLimit; // Allow the date to roll over to the next month
      thisYear += 1; 
    }
    console.log(`running: MDYtoDate(${thisMonth}, ${thisDate}, ${thisYear})`)
    week.push(MDYtoDate(thisMonth, thisDate, thisYear));
    thisDate += 1;
  }
  return week;
};
