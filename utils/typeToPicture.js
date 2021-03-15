const typePictures = [
  'cluster',
  'dream',
  'fantasy town',
  'microverse',
  'planet',
  'resort',
  'space station',
  'tv',
  'unknown',
];

const typeToPicture = (type) => {
  const lowerCaseType = type.toLowerCase();

  if (typePictures.includes(lowerCaseType)) {
    return lowerCaseType.replace(' ', '-');
  }

  return 'unknown';
};

export default typeToPicture;
