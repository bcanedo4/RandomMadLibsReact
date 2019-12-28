export const copyToClipboard = str => {
  const copyToClipboardTextArea = document.getElementById(
    "copy-to-clipboard__textarea"
  );
  const clickedPopUp = document.getElementById('copy-to-clipboard__clicked-pop-up');

  copyToClipboardTextArea.value = str;
  document.body.appendChild(copyToClipboardTextArea);
  copyToClipboardTextArea.select();
  document.execCommand("copy");

  clickedPopUp.classList.remove('hidden');
  clickedPopUp.className += " shown";

  setTimeout(() => {
    clickedPopUp.classList.remove('shown');
    clickedPopUp.className += " hidden";
  },2000)
};