const withCapitalLetter = (word = ' ') => {
  return word[0].toUpperCase() + word.substring(1);
}

export default withCapitalLetter;
