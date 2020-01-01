import React from 'react';
import { Z340Data as data } from '../../data/Z340/Z340Data.js';
import CipherDataHandler from '../../libs/CipherDataHandler/CipherDataHandler.js';
import { SolverStoreProvider } from '../../stores/solver/solverStore.js';
import SymbolGrid from '../../components/SymbolGrid/SymbolGrid.js';
// import CiphertextFrequencyChart from '../../components/CiphertextFrequencyChart/CiphertextFrequencyChart.js';
import FrequencyChart from '../../components/FrequencyChart/FrequencyChart.js';

const handler = new CipherDataHandler(data);
const table = handler.toTable(data.wrapAt);
const cipherFreqency = handler.getFrequencies();

export default function Z340Page() {
  return (
    <div className="Component Page Z340Page">
      <SolverStoreProvider>
        <SymbolGrid table={table} />
        <FrequencyChart rows={cipherFreqency} />
      </SolverStoreProvider>
    </div>
  );
}
