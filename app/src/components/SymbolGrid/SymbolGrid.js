import React from 'react';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { classList } from 'dynamic-class-list';
import {
  useHighlight,
  useSelection,
  useSolution,
} from '../../stores/solver/solverStore.js';

export default function SymbolGrid({ table }) {
  const [highlighted, setHighlighted] = useHighlight();
  const { map, updateMap, undo } = useSolution();
  const [selected, setSelected] = useSelection();

  return (
    <div className="Component SymbolGrid">
      <KeyboardEventHandler
        handleKeys={['alphanumeric', 'backspace']}
        onKeyEvent={handleKey}
      />
      <div>
        <span>Status:</span>
        {selected ? (
          <span>
            Selected Symbol: <span className="symbol">{selected}</span>-
            <span>Press backspace to unselect or a letter/number key to substitute</span>
          </span>
        ) : (
          <span>(Click a symbol to select it)</span>
        )}
      </div>
      <table className="grid-table" onMouseLeave={() => setHighlighted(null)}>
        <tbody>
          {table.map((row, y) => (
            <tr key={y}>
              {row.map((symbol, x) => (
                <td
                  key={x}
                  className={classList('grid-cell symbol', {
                    highlighted: highlighted === symbol,
                    selected: selected === symbol,
                    solved: !!map[symbol],
                  })}
                  onMouseOver={() => setHighlighted(symbol)}
                  onClick={() => setSelected(symbol)}
                >
                  {map[symbol] || symbol}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleKey(key, evt) {
    console.log('handling key: ', key, evt);
    evt.preventDefault();
    if (key === 'backspace') {
      if (selected) {
        setSelected(null);
      } else {
        undo();
      }
      return;
    }
    if (!selected) {
      return;
    }
    updateMap(selected, key.toUpperCase());
    setSelected(null);
  }
}

SymbolGrid.propTypes = {
  table: PropTypes.array,
};
