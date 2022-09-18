/**
 * calculateAverage returns average of Player totalPoints and Clicks
 * @param points
 * @param clicks
 * @return number
 */
export const calculateAverage = (points, clicks) => (points ? points / clicks : 0);

/**
 * Sort Players by total points or average
 * @param player1
 * @param player2
 * @param sortByAvg
 * @return number
 */
 export const sortListByAverage = (player1, player2, sortByAvg) =>
 sortByAvg
   ? calculateAverage(player2.totalPoints, player2.clicks) - calculateAverage(player1.totalPoints, player1.clicks)
   : player2.totalPoints - player1.totalPoints;