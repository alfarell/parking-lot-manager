import moment from "moment";

export const formatTotalTime = (time: number) => {
  const timeDuration = moment.duration(Math.abs(time));

  const days = Math.floor(timeDuration.asDays());
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();

  let totalTimeText: string = "";
  if (days > 0) totalTimeText += `${days} hari `;
  if (hours > 0) totalTimeText += `${hours} jam `;
  if (minutes > 0) totalTimeText += `${minutes} menit `;

  return {
    totalTimeText,
  };
};
export interface CalculateTimeProps {
  dateStart: number;
  duration: number;
}
export const calculateTimeRemaining = ({
  dateStart,
  duration,
}: CalculateTimeProps) => {
  const currentTime = moment();
  const timeEnds = moment(dateStart + duration);
  const timeRemains = timeEnds.diff(currentTime);

  const isExceeded = timeRemains < 0;
  const exceededTime = Math.abs(timeRemains);

  const { totalTimeText } = formatTotalTime(timeRemains);

  return {
    isExceeded,
    exceededTime,
    resultText: totalTimeText,
  };
};

export const convertEpochToDate = (timeMs: number) => {
  return new Date(timeMs).toLocaleString();
};

export const formatTimeTypeToLocale = (type: string) => {
  switch (type) {
    case "minutes":
      return "menit";
    case "hours":
      return "jam";
    case "days":
      return "hari";
    default:
      return;
  }
};
