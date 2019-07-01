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
    info: '',
  };
  handleButtons = ev => {
    let value = ev.target.value;
    let input = this.state.input;
    let sChar = /[\+\-\/\*]/;
    let pChar = /\d+\.|\.\d+/;
    let dig = input.split(sChar);
    let last = dig[dig.length - 1];
    //значение спец знак и последний знак
    if (sChar.test(value)) {
      //меняем знак
      if (sChar.test(input.slice(-1))) {
        //console.log('popal');
        input = input.slice(0, -1);
      }
      //последний знак точка
      if(input.slice(-1) === '.') {
        value = '';
      }
    }

    //пришла точка 
    if (/\./.test(value)) {
      //в послед числе /число./ 
      if (pChar.test(last)) {
        value = '';
        console.log(dig, 'dig test');
      }
      //последн символ точка
      if('.' === input.slice(-1)){
        value = '';
        console.log('testtets')
      }
      //последний символ спецзнак
        if(sChar.test(input.slice(-1))) {
        value ='';
        console.log('specznak');
      }
    }

    //если пришел 0
      if(value === '0') {
      if(input.length === 1) {
        value = '';
        //return false;
      }
    };
    /* if(input.length == 1) {
      if(value === '0') {
        value = '';
        return false;
      }
    }*/
    //если пришло число
    if(/[1-9]/.test(value) && input.length === 1) {
      if(input[0] === '0') {
          console.log('chtoto poshlo ne tak')
         input = input.slice(1);
      }
    }
    //если пишем нули подряд
    if(/^0$/.test(last) && /[0-9]/.test(value) && input.length !== 0) {
     console.log('chto');
      value = '';
    }


    this.setState(state => ({
      input: input + value,
      info: input + value,
    }));
  };
  equal = () => {
    let input = this.state.input;
    let info = '';
    try {
      info = input + ' = ' + eval(input);
    } catch (err) {
      info = 'Please input correct values';
      console.log(err.name);
    } finally {
      this.setState(state => {
        return {
          input: '',
          info: info,
        };
      });
    }
  };
  ac = () => {
    this.setState({
      input: '0',
      info: '',
    });
  };
  renderButtons = () => {
    let buttons = this.state.buttons;

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
          className={styles.buttons}
          value={elem}
          key={i * Math.random(999)}>
          {elem}
        </button>
      )),
    );
  };
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.base}>
          <div className={styles.head}>
            <span> Simple Calc </span>
          </div>
          <div className={styles.info}>{this.state.info}</div>
          <div className={styles.wrap__input}>
            <div className={styles.input}>{this.state.input}</div>
          </div>
          <div className={styles.panel}>{this.renderButtons()}</div>
        </div>
      </div>
    );
  }
}

export default Calc;
