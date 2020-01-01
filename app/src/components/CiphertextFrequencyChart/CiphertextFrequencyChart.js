import React from 'react';
import FrequencyChart from '../../components/FrequencyChart/FrequencyChart.js';
import { useFrequency } from '../../stores/solver/solverStore.js';

export default function CiphertextFrequencyChart() {
  const rows = useFrequency();
  return <FrequencyChart rows={rows} />;
}
