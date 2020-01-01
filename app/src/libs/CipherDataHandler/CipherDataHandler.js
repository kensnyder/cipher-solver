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
}
