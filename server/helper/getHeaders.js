export const getReligionsArray = (religions) => {
  if (!Array.isArray(religions)) {
    console.log('Input should be an array of religions');
  }

  const uniqueReligionsSet = new Set();

  religions.forEach(religion => {
    if (religion && religion.Q9 !== '' && religion.Q9 !== null) {
      uniqueReligionsSet.add(religion.Q9);
    }
  });

  return Array.from(uniqueReligionsSet).map(religion => ({ religion: religion }));
}

export const getEthnicityArray = (ethnicities) => {
  if (!Array.isArray(ethnicities)) {
    console.log('Input should be an array of ethnicity');
  }

  const uniqueEthnicitySet = new Set();

  ethnicities.forEach(ethnicity => {
    if (ethnicity && ethnicity.Q10 !== '' && ethnicity.Q10 !== null) {
      uniqueEthnicitySet.add(ethnicity.Q10);
    }
  });

  return Array.from(uniqueEthnicitySet).map(ethnicity => ({ ethnicity: ethnicity }));
}

export const getImmuzationArray = (immuzations) => {
  if (!Array.isArray(immuzations)) {
    console.log('Input should be an array of immuzation');
  }

  const uniqueImmuzationsSet = new Set();

  immuzations.forEach(immuzation => {
    if (immuzation && immuzation.Q21 !== '' && immuzation.Q21 !== null) {
      uniqueImmuzationsSet.add(immuzation.Q21);
    }
  });

  return Array.from(uniqueImmuzationsSet).map(immuzation => ({ immuzation: immuzation }));
}


