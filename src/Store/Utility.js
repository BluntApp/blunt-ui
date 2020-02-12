export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  };
};

export const blunt = {}

export const isNotBlank = value => {
  return value !== "" && value !== null && value !== undefined;
};

export const isBlank = value => {
  return !isNotBlank(value);
};

export const isNotEmptyObject = value => {
  return value !== null && value !== undefined && isNotEmptyList(Object.keys(value));
};

export const isEmptyObject = value => {
  return !isNotEmptyObject(value);
};

export const isNotEmptyList = list => {
  return list !== null && list !== undefined && list.length > 0;
};

export const isEmptyList = list => {
  return !isNotEmptyList(list);
};
