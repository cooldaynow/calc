import React, {Component} from 'react';
import styles from './index.module.scss';
import {viewInput, delay, logicInput} from '../Checks/index.jsx';
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
    let [inp, val] = logicInput(inputVariables);
    let renderInput = viewInput(inputVariables);

    this.setState(state => ({
      input: inp + val,
      info: inp + val,
      renderInput: renderInput,
    }));
  };
   
  viewErr = (last, input) => {
    let err = 'DIGIT LIMIT MET';
    delay(300)
      .then(() => {
        this.setState(state => ({info: err}));
        return delay(800);
      })
      .then(() => {
        this.setState(state => ({info: input}));
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
            <div className={styles.info}>
              {this.state.info}
            </div>
            <div className={styles.wrap__input}>
              <div className={styles.input}>
                {this.state.renderInput}
              </div>
            </div>
            <div className={styles.panel}>
              {this.renderButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calc;
