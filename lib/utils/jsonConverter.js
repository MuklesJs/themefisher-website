export const convertJSON = (data) => {
  const stringify = JSON.stringify(data);
  const parse = JSON.parse(stringify);
  return parse;
};
