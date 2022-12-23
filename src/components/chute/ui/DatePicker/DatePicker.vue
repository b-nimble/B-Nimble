<template>
  <div class="chute-datepicker-ui-cpt">
    <div class="d-flex justify-content-between">
      <div>
        <label :for="cptProps?.month?.label?.for || ''">Month</label>
        <n-select :input-props="{id: cptProps?.month?.input?.id || ''}" v-model:value="month" :options="monthOptions" :disabled="disabled" :filterable="true"/>
      </div>
      <div>
        <label :for="cptProps?.day?.label?.for || ''">Day</label>
        <n-select :input-props="{id: cptProps?.day?.input?.id || ''}" v-model:value="day" :options="dayOptions" :disabled="dayOptions.length === 1 || disabled" :filterable="true"/>
      </div>
      <div>
        <label :for="cptProps?.year?.label?.for || ''">Year</label>
        <n-select :input-props="{id: cptProps?.year?.input?.id || ''}" v-model:value="year" :options="yearOptions" :disabled="disabled" :filterable="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { NSelect } from 'naive-ui';

export default {
  props: ['value', 'disabled', 'cptProps'],
  emits: ['update:value', 'input', 'change'],
  components: {
    NSelect,
  },
  setup() {
    return {
      year: ref(''),
      month: ref(''),
      day: ref(''),
    };
  },
  mounted() {
    if (this.value) {
      const value = moment.unix(this.value);

      this.year = value.year();
      this.month = value.month() + 1;
      this.day = value.date();
    }
  },
  methods: {
    emitValue(changed) {
      if (changed === 'month' && this.day >= 28 && this.month === 2) {
        this.day = '';
      }

      if (this.year === '' || this.month === '' || this.day === '') {
        this.$emit('update:value', '');
        this.$emit('input', '');
        this.$emit('change', '');

        return;
      }

      const value = moment(`${this.year}-${this.day}-${this.month}`, 'YYYY-DD-MM').unix();

      this.$emit('update:value', value);
      this.$emit('input', value);
      this.$emit('change', value);
    },
  },
  computed: {
    yearOptions() {
      const years = [{
        label: 'YYYY',
        value: '',
      }];

      const currentYear = (new Date()).getFullYear();

      for (let i = currentYear; i > 1913; i--) {
        years.push({
          label: i,
          value: i,
        });
      }

      return years;
    },
    monthOptions() {
      const months = [{
        label: 'MM',
        value: '',
      }];

      for (let i = 1; i <= 12; i++) {
        months.push({
          label: i <= 9 ? `0${i}` : i,
          value: i,
        });
      }

      return months;
    },
    dayOptions() {
      const days = [{
        label: 'DD',
        value: '',
      }];

      if (!this.year || !this.month) {
        for (let i = 1; i <= 31; i++) {
          days.push({
            label: i <= 9 ? `0${i}` : i,
            value: i,
          });
        }

        return days;
      }

      const daysInMonth = moment(`${this.year}-${this.month}`, "YYYY-MM").daysInMonth();

      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          label: i <= 9 ? `0${i}` : i,
          value: i,
        });
      }

      return days;
    },
  },
  watch: {
    value(newValue) {
      if (newValue != null && !newValue) {
        return;
      }

      if (newValue === null) {
        this.year = '';
        this.month = '';
        this.day = '';

        return;
      }

      const value = moment.unix(newValue);
      this.year = value.year();
      this.month = value.month() + 1;
      this.day = value.date();
    },
    year() {
      this.emitValue('year');
    },
    month() {
      this.emitValue('month');
    },
    day() {
      this.emitValue('day');
    },
  }
}
</script>

<style lang="scss">
.chute-datepicker-ui-cpt {
  width: 100%;

  > div {
    width: 100%;

    > div {
      width: 25%;
    }
  }
}
</style>
