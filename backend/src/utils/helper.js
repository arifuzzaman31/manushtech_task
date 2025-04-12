const { isWithinInterval } = require('date-fns');

const getActivePromotion = (promotions, today = new Date()) =>
  promotions.find(promo =>
    promo.enabled &&
    isWithinInterval(today, { start: promo.startDate, end: promo.endDate })
    );

module.exports = {
  getActivePromotion,
};