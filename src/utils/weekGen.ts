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
  let thisMonth = startDate.getMonth() + 1; // month is zero indexed here?
  let thisYear = startDate.getYear();
  console.log(`got day ${thisMonth}/${thisDate}/${thisYear} with rollover: ${rolloverLimit}`);
  for (let i = sundaysDate ; i < (sundaysDate + 7) ; i++) {
    if (i > rolloverLimit) {
      thisDate = i - rolloverLimit;
      if (i == (rolloverLimit + 1)) {
        thisYear += 1;
        thisMonth += 1;
        if (thisMonth == 13) {
          thisMonth = 1;
        }
      }
    }
    console.log(`generating day ${thisMonth}/${thisDate}/${thisYear} with rollover: ${rolloverLimit}`);
    week.push(MDYtoDate(thisMonth, thisDate, thisYear));
    thisDate += 1;
  }
  return week;
};
