import moment from "moment";

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
  const timeDuration = moment.duration(Math.abs(timeRemains));

  const days = Math.floor(timeDuration.asDays());
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();

  let formatTimeRemaining: string = "";
  if (days > 0) formatTimeRemaining += `${days} hari `;
  if (hours > 0) formatTimeRemaining += `${hours} jam `;
  if (minutes > 0) formatTimeRemaining += `${minutes} menit `;

  return {
    isExceeded,
    exceededTime,
    resultText: formatTimeRemaining,
  };
};
