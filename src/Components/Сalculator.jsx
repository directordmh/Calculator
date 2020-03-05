import React from 'react'
import s from './Сalculator.module.css'

const Calculator = ({
                        arrButton, inputValue, resultValue, inputChange, buttonClick, inputKey, plus, historyOpen,
                        historyClose, historyCalc, histText
                    }) => {

    return (
        <>
            <div className={s.calculBlock}>
                <input className={s.inputCalc} onChange={inputChange} onKeyDown={inputKey} value={inputValue}/>
                <div className={s.result}><p>{resultValue}</p></div>
                <div className={s.result}><p>{plus}</p></div>
                {arrButton.map((u, i) =>
                    <div className={u === 'C' || u === '←'
                        ? s.button + ' ' + s.buttonRed
                        : u === '-' || u === '+' || u === '*' || u === '/'
                            ? s.button + ' ' + s.buttonBlue
                            : u === 'MR' || u === 'M+' || u === 'CM'
                                ? s.button + ' ' + s.buttonOrange
                                : u === '='
                                    ? s.button + ' ' + s.buttonGreen
                                    : u === 'HIST'
                                        ? s.button + ' ' + s.buttonOrangeColor
                                        : s.button
                    }
                         key={i}
                         onClick={buttonClick}>
                        {u}
                    </div>
                )}
                {historyOpen ? <>
                        <div className={s.close} onClick={historyClose}>X</div>
                        <div className={s.hist}>
                            {historyCalc.map((u, i) => <p className={s.histText} key={i} onClick={histText(u)}>{u}</p>)}
                        </div>
                    </>
                    : ''}
            </div>
        </>
    )
}

export default Calculator