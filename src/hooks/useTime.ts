import { ref, onMounted, onUnmounted } from 'vue';

/**
 * @description Get local time
 */
export function useTime() {
  let timer; // Timer
  const year = ref(0); // Years
  const month = ref(0); // Month
  const week = ref(''); // Day of the week
  const day = ref(0); // Days
  const hour = ref<number | string>(0); // Hour
  const minute = ref<number | string>(0); // Minute
  const second = ref(0); // Second

  // update time
  const updateTime = () => {
    const date = new Date();
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    week.value = 'Day one two three four five six'.charAt(date.getDay());
    day.value = date.getDate();
    hour.value =
      (date.getHours() + '')?.padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getHours());
    minute.value =
      (date.getMinutes() + '')?.padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getMinutes());
    second.value = date.getSeconds();
  };

  // native time formatting
  // new Intl.DateTimeFormat('zh', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //     hour12: false
  // }).format(new Date())

  updateTime();

  onMounted(() => {
    clearInterval(timer);
    timer = setInterval(() => updateTime(), 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return { month, day, hour, minute, second, week };
}
