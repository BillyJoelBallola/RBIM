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

export const getCauseOfDeathArray = (causes) => {
  if (!Array.isArray(causes)) {
    console.log('Input should be an array of causes');
  }

  const uniqueCausesSet = new Set();

  causes.forEach(cause => {
    if (cause && cause.Q54 !== '' && cause.Q54 !== null && !["N/A", "n/a", "N/a"].includes(cause.Q54)) {
      uniqueCausesSet.add(cause?.Q54?.split(",")[1]?.trim());
    }
  });

  return Array.from(uniqueCausesSet).map(cause => ({ cause: cause }));
}

export const getReasonOfDeathArray = (causes) => {
  if (!Array.isArray(causes)) {
    console.log('Input should be an array of causes');
  }

  const uniqueCausesSet = new Set();

  causes.forEach(cause => {
    if (cause && cause.Q55 !== '' && cause.Q55 !== null && !["N/A", "n/a", "N/a"].includes(cause.Q55)) {
      uniqueCausesSet.add(cause?.Q55?.split(",")[2]?.trim());
    }
  });

  return Array.from(uniqueCausesSet).map(cause => ({ cause: cause }));
}

export const getPrimaryNeedsArray = (arr) => {
  const uniqueNeedsSet = new Set();

  arr.forEach(item => {
    if (item && item.Q57 !== '' && item.Q57 !== null && !["N/A", "n/a", "N/a"].includes(item.Q57)) {
      const ansArr = item.Q57.split(",")
      if(ansArr.length > 0){
        ansArr.map(ans => {
          if (!uniqueNeedsSet.has(ans.trim())) { 
            uniqueNeedsSet.add(ans.trim());
          }
        })
      }else{
        if (!uniqueNeedsSet.has(item.Q57.trim())) { 
          uniqueNeedsSet.add(item.Q57.trim());
        }
      }
    }
  });

  return Array.from(uniqueNeedsSet).map(need => ({ need: need }));
}