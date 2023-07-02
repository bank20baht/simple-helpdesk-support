import pino from "pino";
import pinoPretty from "pino-pretty";
import dayjs from "dayjs";

const log = pino({
  prettifier: pinoPretty,
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
