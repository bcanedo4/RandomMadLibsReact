// delete content
export const deleteContent = content => {
  for (let i = content.length - 1; i >= 0; --i) {
    content[i].innerHTML = "";
  }
};