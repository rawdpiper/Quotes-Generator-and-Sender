const cron = require('node-cron');
const sendEmail = require('../utils/sendMail');

cron.schedule(
  "0 4 * * *",
  async () => {
    console.log("running cron job");
    await sendEmail();
  },
  {
    scheduled: true,
    timezone: "Africa/Lagos",
  }
);
