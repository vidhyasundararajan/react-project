export function getStocks() {
  return [
    { abbr: 'CT', name: 'CT BRAIN' },
    { abbr: 'MRI', name: 'MRI BRAIN' },
    { abbr: 'LAB', name: 'GLUCOSE FASTING' },
  ];
}

export function matchStocks(state, value) {
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}