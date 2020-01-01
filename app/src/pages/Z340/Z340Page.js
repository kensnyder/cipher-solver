import React from 'react';
import { Z340Data as data } from '../../data/Z340/Z340Data.js';
import CipherDataHandler from '../../libs/CipherDataHandler/CipherDataHandler.js';
import SymbolGrid from '../../components/SymbolGrid/SymbolGrid.js';
import { SolverStoreProvider } from '../../stores/solver/solverStore.js';

const handler = new CipherDataHandler(data);
const table = handler.toTable(data.wrapAt);

export default function Z340Page() {
  return (
    <div className="Component Page Z340Page">
      <SolverStoreProvider>
        <SymbolGrid table={table} />
      </SolverStoreProvider>
    </div>
  );
}
