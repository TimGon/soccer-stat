export const statusMap = {
  SCHEDULED: "Запланирован",
  LIVE: "В прямом эфире",
  IN_PLAY: "В игре",
  PAUSED: "Пауза",
  FINISHED: "Завершен",
  POSTPONED: "Отложен",
  SUSPENDED: "Приостановлен",
  CANCELED: "Отменен",
};

export const getStatusText = (status) => {
  if (!status) return "—";
  return statusMap[status] || status;
};
