export const getTime = (date: string) => {
  return new Date(date).toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit"
  });
};
