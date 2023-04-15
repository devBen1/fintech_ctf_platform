export const forLoop = (el: any, count: number) => {
  let arr: any[] = [];
  let i: number = 0;
    for (i; i < count; i++) {
      arr.push(el);
    }
  return arr;
};