export const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

export const callback = (condition, action) => (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && condition) {
      action();
    }
  });
};
