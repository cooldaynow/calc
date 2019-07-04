export const logicVariables = (input, value) => {
  let sChar = /[\+\-\/\*]/;
  let pChar = /\d+\.|\.\d+/;
  let dig = input.split(sChar);
  let last = dig[dig.length - 1];
  let lastChar = input.slice(-1);

  let inputVariables = {
    sChar,
    value,
    input,
    last,
    lastChar,
    pChar,
  };

  return inputVariables;
};
export const logicInput = (
  {value, input, last, sChar, pChar, lastChar},
  viewErr,
) => {
  //значение спец знак
  if (sChar.test(value)) {
    //последний спецзнак меняем знак
    if (sChar.test(lastChar)) {
      input = input.slice(0, -1);
    }
    //последний знак точка
    if (lastChar === '.') {
      value = '';
    }
  }
  //пришла точка
  if (/\./.test(value)) {
    if (
      pChar.test(last) ||
      lastChar === '.' ||
      sChar.test(lastChar) ||
      last.length > 9
    ) {
      value = '';
    }
  }

  //пришел 0
  if (value === '0') {
    if (input.length === 1 && lastChar === '0') {
      value = '';
    }
  }
  //пришло число
  if (/[1-9]/.test(value) && input.length === 1) {
    if (input[0] === '0') {
      input = input.slice(1);
    }
  }
  //пишем нули подряд
  if (/^0$/.test(last) && /[0-9]/.test(value) && input.length !== 0) {
    value = '';
  }
  //длина не в допуске
  if (last.length > 10 && !sChar.test(value)) {
    //выводим ошибку
    viewErr(input);
    value = '';
  }
  return input + value;
};
export const delay = time => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};

export const viewInput = ({value, input, last, sChar, pChar, lastChar}) => {
  //длина не в допуске
  if (last.length > 10 && !sChar.test(value)) {
    input = last;
    return input;
  }

  //приходит число
  if (/[0-9]/.test(value)) {
    //если число или число точка или пустая строка
    if (/\d+|\d+\.|(^$)/.test(last)) {
      input = last + value;
    }
    if (input[0] === '0' && input.length < 3) {
      input = value;
    }
  }
  //пришла точка
  if (/\./.test(value)) {
    //число и точка или пустая строка
    if (/\d+\.|(^$)/.test(last)) {
      input = last;
    }
    if (/^\d+$/.test(last)) {
      input = last + value;
    }
    if (sChar.test(lastChar)) {
      input = lastChar;
    }
    if (last.length > 9) {
      input = input.slice(0, -1);
    }
  }
  //приходит спец знак
  if (sChar.test(value)) {
    if (/\d+|\d+\./.test(last) || sChar.test(lastChar)) {
      input = value;
    }
    if (lastChar === '.') {
      input = last;
    }
  }
  return input;
};
export const equalLogic = input => {
  let info = '';
  let renderInput = '';
  try {
    if (/\.|\*|\+|-|\//.test(input.slice(-1))) {
      input = input.slice(0, -1);
    }
    // 0/0
    if (Number.isNaN(eval(input))) {
      info = 'This calculator does not allow to divide by zero: (';
      // dig/0
    } else if (!isFinite(eval(input))) {
      info = 'To infinity... and beyond :)';
    } else {
      let result = eval(input);
      info = `${input} = ${result}`;
      renderInput = result;
    }
  } catch (err) {
    info = 'Please input correct values: ' + err.name;
  } finally {
    return () => ({
      input: '0',
      info: info,
      renderInput: renderInput,
    });
  }
};
