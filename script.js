document.addEventListener('DOMContentLoaded', () => {
  const encryptBtn = document.getElementById('encryptBtn');
  const decryptBtn = document.getElementById('decryptBtn');
  const dataInput = document.getElementById('data');
  const keyInput = document.getElementById('key');
  const resultDiv = document.getElementById('result');

  encryptBtn.addEventListener('click', async () => {
    const data = dataInput.value.trim();
    const key = keyInput.value.trim();
    if (data === '' || key === '') {
      showError('Please enter data and key.');
      return;
    }

    const encryptedData = await encryptData(data, key);
    displayResult(`Encrypted Data: ${encryptedData}`);
  });

  decryptBtn.addEventListener('click', () => {
    const encryptedData = dataInput.value.trim();
    const key = keyInput.value.trim();
    if (encryptedData === '' || key === '') {
      showError('Please enter encrypted data and key.');
      return;
    }

    try {
      const decryptedData = decryptData(encryptedData, key);
      displayResult(`Decrypted Data: ${decryptedData}`);
    } catch (error) {
      console.error('Decryption error:', error);
      showError('Decryption failed. Incorrect key or data.');
    }
  });

  function encryptData(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  function decryptData(encryptedData, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  function displayResult(message) {
    resultDiv.innerHTML = message;
  }

  function showError(message) {
    resultDiv.innerHTML = `<span style="color: red;">${message}</span>`;
  }
});
