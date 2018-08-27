const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const { combine, timestamp, label, printf } = format;
const formatter = printf(
  info => `${info.level}: ${info.timestamp} ${info.message}`
);

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    formatter
  ),
  transports: [
    //new transports.Console(),
    new transports.File({
      filename: `./log/auto-login-error.log`,
      level: "error"
    }),
    //new transports.File({ filename: `./log/${day}-logger.log` })
    new DailyRotateFile({
      filename: "log/%DATE%-logger.log",
      datePattern: "YYYY-MM-DD"
    })
  ]
});

module.exports = logger;
