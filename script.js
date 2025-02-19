document.addEventListener('DOMContentLoaded', () => {
    const decimalInput = document.getElementById('decimalInput');
    const resultContainer = document.getElementById('resultContainer');
    const integerResult = document.getElementById('integerResult');
    const fractionalSection = document.getElementById('fractionalSection');
    const fractionalResult = document.getElementById('fractionalResult');
    const combinedResult = document.getElementById('combinedResult');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const toast = document.getElementById('toast');
  
    function convertToBinary(value) {
      if (!value) {
        integerResult.textContent = '0';
        fractionalResult.textContent = '0';
        resultContainer.classList.add('hidden');
        return;
      }
  
      // Handle fraction input (e.g., "10/7")
      let numericValue = value;
      if (value.includes('/')) {
        const [numerator, denominator] = value.split('/').map(Number);
        if (denominator === 0) {
          integerResult.textContent = 'Error';
          resultContainer.classList.remove('hidden');
          fractionalSection.classList.add('hidden');
          return;
        }
        numericValue = (numerator / denominator).toString();
      }
  
      const [integerPart, fractionalPart = ''] = numericValue.split('.');
      
      // Convert integer part
      const integer = Math.abs(parseInt(integerPart) || 0);
      let binaryInteger = integer.toString(2);
      if (parseInt(integerPart) < 0) {
        binaryInteger = '-' + binaryInteger;
      }
      integerResult.textContent = binaryInteger || '0';
  
      // Convert fractional part
      if (fractionalPart) {
        let fraction = parseFloat('0.' + fractionalPart);
        let binaryFraction = '';
        const maxPrecision = 8;
        
        for (let i = 0; i < maxPrecision && fraction > 0; i++) {
          fraction *= 2;
          binaryFraction += Math.floor(fraction);
          fraction -= Math.floor(fraction);
        }
        
        fractionalResult.textContent = binaryFraction;
        fractionalSection.classList.remove('hidden');
        combinedResult.textContent = binaryInteger + '.' + binaryFraction;
      } else {
        fractionalSection.classList.add('hidden');
      }
  
      resultContainer.classList.remove('hidden');
    }
  
    function showToast() {
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 2000);
    }
  
    decimalInput.addEventListener('input', (e) => {
      const value = e.target.value;
      if (value === '' || /^-?\d*\.?\d*$/.test(value) || /^\d*\/?\.?\d*$/.test(value)) {
        convertToBinary(value);
      }
    });
  
    clearBtn.addEventListener('click', () => {
      decimalInput.value = '';
      convertToBinary('');
    });
  
    copyBtn.addEventListener('click', () => {
        let textToCopy = fractionalSection.classList.contains('hidden') 
          ? integerResult.textContent.trim() 
          : combinedResult.textContent.trim();
      
        if (!textToCopy || textToCopy === '0') {
          alert("Nothing to copy!");
          return;
        }
      
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast();
        }).catch(err => {
          console.error("Copy failed: ", err);
          alert("Failed to copy. Try again!");
        });
      });
      
  });