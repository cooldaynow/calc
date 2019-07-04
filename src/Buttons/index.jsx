import React, {Component} from 'react';
import styles from '../Buttons/index.module.scss';

class Buttons extends Component {
  state = {
    buttons: [
      ['AC', '/', '*'],
      [7, 8, 9, '-'],
      [4, 5, 6, '+'],
      [1, 2, 3, '='],
      [0, '.'],
    ],
  };
  renderButtons = () => {
    let buttons = this.state.buttons;
    let sChar = /-|\+|\/|\*/;

    return buttons.map(el =>
      el.map((elem, i) => (
        <button
          onClick={
            elem === '='
              ? this.props.equal
              : elem === 'AC'
              ? this.props.ac
              : this.props.handleButtons
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
    return <div className={styles.panel}>{this.renderButtons()}</div>;
  }
}

export default Buttons;
