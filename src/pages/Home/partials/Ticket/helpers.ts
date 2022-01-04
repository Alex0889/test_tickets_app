import dayjs from 'dayjs';

export const priceWithLocale = (price: number): string => {
  return price.toLocaleString('ru-RU', {
    currency: 'RUB',
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const generateTimeStr = (from: string, to: number) => {
  const startTime = getTime(from);

  const endTime = getTime(new Date(new Date(from).getTime() + to * 60 * 1000));
  return `${startTime} - ${endTime}`;
};

export const getTime = (time: string | Date) => {
  return dayjs(time).format('HH:mm');
};

export const generateStopsStr = (stops: string[]) => {
  return String(stops).split(',').join(', ');
};

export const generateDurationStr = (duration: number) => {
  var hours = Math.floor(duration / 60);
  var minutes = duration % 60;
  return `${hours}ч ${minutes < 9 ? '0' + minutes : minutes}м`;
};
