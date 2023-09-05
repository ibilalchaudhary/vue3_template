import { ref, onMounted, onUnmounted } from 'vue';

/**
 * @description Whether the user network is available
 * */
export function useOnline() {
  const online = ref(true);

  const showStatus = (val) => {
    online.value = typeof val == 'boolean' ? val : val.target.online;
  };

  // After the page loads, set the correct network state
  navigator.onLine ? showStatus(true) : showStatus(false);

  onMounted(() => {
    // Start listening for changes in network status
    window.addEventListener('online', showStatus);

    window.addEventListener('offline', showStatus);
  });
  onUnmounted(() => {
    // Remove listening for changes in network state
    window.removeEventListener('online', showStatus);

    window.removeEventListener('offline', showStatus);
  });

  return { online };
}
