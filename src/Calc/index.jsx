import React, {Component} from 'react';
import styles from './index.module.scss';
import {
  viewInput,
  delay,
  logicInput,
  logicVariables,
  equalLogic,
} from '../Checks/index.jsx';
import Buttons from '../Buttons';

class Calc extends Component {
  state = {
    input: '0',
    renderInput: '0',
    info: '',
  };
  handleButtons = ev => {
    let value = ev.target.value;
    let input = this.state.input;
    let viewErr = this.viewErr;
    let output = logicInput(logicVariables(input, value), viewErr);
    let renderInput = viewInput(logicVariables(input, value));

    this.setState(state => ({
      input: output,
      info: output,
      renderInput: renderInput,
    }));
  };

  viewErr = input => {
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
    this.setState(equalLogic(input));
  };
  ac = () => {
    this.setState({
      input: '0',
      renderInput: '0',
      info: '',
    });
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
            <Buttons
              handleButtons={this.handleButtons}
              equal={this.equal}
              ac={this.ac}
              viewErr={this.viewErr}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Calc;
