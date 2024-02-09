export const getSum = (array) => {
    const columnTotals = {};
    for (const row of array) {
        for (const [key, value] of Object.entries(row)) {
            if (typeof value === 'number') {
                columnTotals[key] = (columnTotals[key] || 0) + value;
            }
        }
    }

    return columnTotals;
}