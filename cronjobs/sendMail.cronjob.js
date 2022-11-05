const cron = require('node-cron');
const sendEmail = require('../utils/sendMail');

cron.schedule(
  "21 20 * * *",
  async () => {
    console.log("running cron job");
    await sendEmail();
  },
  {
    scheduled: true,
    timezone: "Africa/Lagos",
  }
);
