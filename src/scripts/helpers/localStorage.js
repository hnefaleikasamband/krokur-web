export const getObjectFromLocalStorage = name => {
  try {
    const serializedData = localStorage.getItem(name) || {};
    return JSON.parse(serializedData);
  } catch (error) {
    return {};
  }
};

/**
 * Updates the local storage by merging the previous values with the new payload.
 */
export const updateObjectFromLocalStorage = (name, payload) => {
  try {
    const previousData = getObjectFromLocalStorage(name);
    const newData = {
      ...previousData,
      ...payload
    };
    const serializedData = JSON.stringify(newData);
    localStorage.setItem(name, serializedData);
  } catch (error) {
    console.error(
      "Something went wrong while saving object data in local storage.",
      error
    );
  }
};

export const getFromLocalStorage = name => {
  try {
    const serializedData = localStorage.getItem(name) || "";
    return serializedData;
  } catch (error) {
    return "";
  }
};

export const updateLocalStorage = (name, payload) => {
  try {
    localStorage.setItem(name, payload);
  } catch (error) {
    console.error(
      "Something went wrong while saving data in local storage.",
      error
    );
  }
};

export const removeFromLocalStorage = name => {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.error("Somethign went wront clearing data in local storage");
  }
};
