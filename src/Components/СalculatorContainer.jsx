import React, {useState} from 'react'
import Calculator from "./Сalculator";

const CalculatorContainer = () => {

    const [inputValue, setInputValue] = useState('')
    const [resultValue, setResultValue] = useState('')
    const [plus, setPlus] = useState('')
    const [historyCalc, setHistoryCalc] = useState([])
    const [historyOpen, setHistoryOpen] = useState(false)

    const arrButton = ['HIST', '(', ')', 'C', '←', '7', '8', '9', '/', 'MR', '4', '5',
        '6', '*', 'M+', '1', '2', '3', '-', 'CM', '0', '.', '%', '+', '=']
    const arrOfCharacters = ['+', '-', '*', '/', '.', '(', ')', '%', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    const histText = a => {
        return () => {
            let s = a.indexOf('=')
            s = a.slice(0, s)
            setHistoryOpen(false)
            setInputValue(s)
            total(s)
        }
    }

    const historyClose = () => {
        setHistoryOpen(false)
    }

    // преаброзавание строки в массив -----------------------------
    const stringToArr = string => {
        if (string.length < 1) return []
        let a = string.replace(/(\d+\.\d+)|(\d+)|([)(%/*+-])/g, '$& ')
        a = a.split(' ')
        a.pop()
        return a.map(u => +u ? +u : u)
    }

    const evalSum = data => {
        try {
            return +eval(data).toFixed(15)
        } catch (err) {
            return false
        }
    }

    const result = arr => {
        let copy = [...arr]
        const search = u => {
            if (u - 3 >= 0) if (copy[u - 2] === '-' && +copy[u - 3] || copy[u - 2] === '+' && +copy[u - 3]) {
                let c = copy.slice(0, u - 2)
                copy[u] = `/100*(${c.join('')})`
                return
            }
            copy[u] = '/100'
        }
        let index = arr.map((u, i) => u === '%' ? i : '')
        index = index.filter(u => u !== '')
        index.map(search)
        return evalSum(copy.join(''))
    }

    const start = string => {
        const arr = stringToArr(string)
        if (!arr.some(u => u === '%')) return evalSum(arr.join(''))
        return result(arr)
    }

    const hist = () => {
        if (historyCalc.length === 50) setHistoryCalc(historyCalc.splice(0, 1))
        setHistoryCalc([inputValue + '=' + resultValue, ...historyCalc])
    }

    const buttonClick = e => {
        let b = e.target.textContent
        if (b === 'HIST') {
            return setHistoryOpen(true)
        }
        if (b === 'M+') {
            if (plus === '') setPlus(resultValue)
            else setPlus(plus + resultValue)
            return
        }
        if (b === 'CM') return setPlus('')
        if (b === 'MR') {
            setInputValue(inputValue + plus)
            total(inputValue + plus)
            return
        }
        if (b === '=') {
            hist()
            setInputValue(resultValue)
            return
        }
        if (b === 'C') return def()
        let a
        if (b === '←') {
            a = String(inputValue)
            a = a.substr(0, a.length - 1)
        } else a = inputValue + e.target.textContent
        setInputValue(a)
        if (a.length === 1 && a === '-') return
        if (a.length === 0) return setResultValue('')
        total(a)
    }

    const check = etv => {
        for (let i = 0; i < etv.length; i++) {
            if (!arrOfCharacters.some(item => item === etv[i])) return false
        }
        return true
    }

    const total = etv => {
        try {
            if (+start(etv) !== Infinity) setResultValue(+start(etv).toFixed(15))
            else setResultValue('?')
        } catch (err) {
            setResultValue(resultValue)
        }
    }

    const def = () => {
        setInputValue('')
        setResultValue('')
    }

    const inputKey = e => {
        let a = e.key
        if (a === '=' || a === 'Enter') {
            hist()
            setInputValue(resultValue)
        }
        if (a === 'c') def()
    }
    const inputChange = e => {
        let etv = e.target.value
        if (!check(etv)) return
        setInputValue(etv)
        if (etv.length === 1 && etv === '-') return
        if (etv.length === 0) return setResultValue('')
        total(etv)
    }

    return (
        <>
            <Calculator
                arrButton={arrButton}
                inputValue={inputValue}
                resultValue={resultValue}
                inputChange={inputChange}
                buttonClick={buttonClick}
                inputKey={inputKey}
                plus={plus}
                historyOpen={historyOpen}
                historyClose={historyClose}
                historyCalc={historyCalc}
                histText={histText}
            />
        </>
    )
}

export default CalculatorContainer