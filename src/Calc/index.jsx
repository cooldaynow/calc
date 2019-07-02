import React, {Component} from 'react';
import styles from './index.module.scss';
class Calc extends Component {
  state = {
    buttons: [
      ['AC', '/', '*'],
      [7, 8, 9, '-'],
      [4, 5, 6, '+'],
      [1, 2, 3, '='],
      [0, '.'],
    ],
    input: '0',
    renderInput: '0',
    info: '',
  };
  handleButtons = ev => {
    let value = ev.target.value;
    let input = this.state.input;
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
    let [inp, val] = this.logicInput(inputVariables);
    let renderInput = this.viewInput(inputVariables);

    this.setState(state => ({
      input: inp + val,
      info: inp + val,
      renderInput: renderInput,
    }));
  };

  viewInput = ({value, input, last, sChar, pChar, lastChar}) => {
    /* VIEW INPUT */
    //длина не в допуске
    if (last.length > 10 && !sChar.test(value)) {
      input = last;
      return input;
    }

    //если приходит число
    if (/[0-9]/.test(value)) {
      //если число или число точка или пустая строка
      if (/\d+|\d+\.|(^$)/.test(last)) {
        input = last + value;
      }
      if (input[0] === '0' && input.length < 3) {
        input = value;
      }
    }
    //если пришла точка
    if (/\./.test(value)) {
      //если число и точка или пустая строка
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
  logicInput = ({value, input, last, sChar, pChar, lastChar}) => {
    /* LOGIC INPUT */
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

    //если пришел 0
    if (value === '0') {
      if (input.length === 1 && lastChar === '0') {
        value = '';
      }
    }
    //если пришло число
    if (/[1-9]/.test(value) && input.length === 1) {
      if (input[0] === '0') {
        input = input.slice(1);
      }
    }
    //если пишем нули подряд
    if (/^0$/.test(last) && /[0-9]/.test(value) && input.length !== 0) {
      value = '';
    }
    //если длина не в допуске
    if (last.length > 10 && !sChar.test(value)) {
      this.viewErr(last, input);
      value = '';
    }
    return [input, value];
  };
  viewErr = (last, input) => {
    this.delay(300)
      .then(() => {
        this.setState(state => ({info: 'digit limit met'.toUpperCase()}));

        return this.delay(800);
      })
      .then(() => {
        this.setState(state => ({info: input}));
      });
  };
  delay = time => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  };

  equal = () => {
    let input = this.state.input;
    let info = '';
    let renderInput = '';
    try {
      if (/\.|\*|\+|-|\//.test(input.slice(-1))) {
        input = input.slice(0, -1);
      }
      if (Number.isNaN(eval(input))) {
        info = 'This calculator does not allow to divide by zero: (';
      } else if (!isFinite(eval(input))) {
        info = 'To infinity... and beyond :)';
      } else {
        let result = eval(input);
        info = `${input} = ${result}`;
        renderInput = result;
      }
    } catch (err) {
      info = 'Please input correct values';
      console.log(err.name);
    } finally {
      this.setState(state => {
        return {
          input: '0',
          info: info,
          renderInput: renderInput,
        };
      });
    }
  };
  ac = () => {
    this.setState({
      input: '0',
      renderInput: '0',
      info: '',
    });
  };
  renderButtons = () => {
    let buttons = this.state.buttons;
    let sChar = /-|\+|\/|\*/;

    return buttons.map(el =>
      el.map((elem, i) => (
        <button
          onClick={
            elem === '='
              ? this.equal
              : elem === 'AC'
              ? this.ac
              : this.handleButtons
          }
          id={
            elem === '='
              ? styles.equal
              : elem === 0
              ? styles.zero
              : styles[elem]
          }
          className={
            sChar.test(elem)
              ? `${styles.sChar} ${styles.buttons}`
              : styles.buttons
          }
          value={elem}
          key={i}>
          {elem}
        </button>
      )),
    );
  };
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.frame}>
          <div className={styles.base}>
            <div className={styles.head}>
              <span> Simple Calc </span>
            </div>
            <div className={styles.info}>{this.state.info}</div>
            <div className={styles.wrap__input}>
              <div className={styles.input}>{this.state.renderInput}</div>
            </div>
            <div className={styles.panel}>{this.renderButtons()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calc;
