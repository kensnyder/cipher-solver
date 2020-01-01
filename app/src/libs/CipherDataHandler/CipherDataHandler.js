export default class CipherDataHandler {
  constructor(data) {
    this.data = data;
  }

  toTable(wrapAt) {
    const table = [];
    let i = 0;
    let row = [];
    let remainder;
    while (i < this.data.ciphertext.length) {
      remainder = i % wrapAt;
      row.push(this.data.ciphertext.charAt(i));
      if (remainder === wrapAt - 1) {
        table.push(row);
        row = [];
      }
      i++;
    }
    return table;
  }

  getFrequencies() {
    const counts = {};
    let i = 0;
    while (i < this.data.ciphertext.length) {
      const char = this.data.ciphertext.charAt(i);
      if (!counts[char]) {
        counts[char] = 0;
      }
      counts[char]++;
      i++;
    }
    const freq = Object.keys(counts).map(char => ({
      symbol: char,
      symbolFont: 'ZodiacFont',
      count: counts[char],
      percent: counts[char] / this.data.ciphertext.length,
      bars: [
        {
          color: 'blue',
          width: counts[char],
        },
      ],
    }));
    freq.sort((a, b) => {
      return b.count - a.count;
    });
    return freq;
  }
}
