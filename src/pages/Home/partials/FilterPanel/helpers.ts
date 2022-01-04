export const generateIndexesArr = (stopsArr: boolean[]) => {
  return stopsArr.reduce((acc: number[], item, i) => {
    if (item) acc = [...acc, i];
    return acc;
  }, []);
};
