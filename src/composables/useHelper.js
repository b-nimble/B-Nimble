import { computed } from 'vue';
import states from '@/shared/constants/states';

export default function () {
  // METHODS
  const stateOptions = computed(() => {
    return states.map((s) => ({
      label: s.label.toUpperCase(),
      value: s.value
    }));
  });

  return {
    stateOptions,
  };
}
