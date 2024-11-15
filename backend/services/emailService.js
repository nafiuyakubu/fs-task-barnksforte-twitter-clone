// services/emailService.js

const sendEmail = (recipientEmail, tweetContent) => {
  console.log(`Simulated Email Sent!`);
  console.log(`To: ${recipientEmail}`);
  console.log(`Subject: New Tweet Shared with You`);
  console.log(
    `Message: A new tweet has been shared with you: "${tweetContent}"`
  );
};

module.exports = { sendEmail };
