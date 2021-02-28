import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { evaluate } from 'mathjs'
import Button from './Button'

const keySet = new Set(['0','1','2','3','4','5','6','7','8','9','+','-','/','*','(',')', '.'])

const Calculator = () => {
    const [input, setInput] = useState('')

    // add event listener for key press
    useEffect(() => {
        window.addEventListener('keydown', onKeyPress)
        return () => window.removeEventListener('keydown', onKeyPress)
    })

    function onKeyPress({ key }) {
        if (keySet.has(key)) {
            onPress(key)
        } else if (key === 'Backspace') {
            back()
        } else if (key === '=' || key === 'Enter') {
            submit()
        }
    }

    // remove last char
    function back() {
        if (input.length > 0) {
            setInput(input.slice(0, -1))  
        }
    }

    // add char to input and current token on number press
    function onPress(key) {
        setInput(input + key)
    }

    // clear input, current token, and token list
    function clear() {
        setInput('')
    }

    async function submit() {
        if (input.length === 0) {
            return
        }
        let answer
        try {
            answer = evaluate(input)
        } catch(e) {
            answer = 'error'
        }
        const calculation = input + ' = ' + answer
        await axios.post('/api/history', { calculation })
        setInput('')
    }
    
    const layout = [
        [{ label: '(', onClick: onPress }, { label: ')', onClick: onPress }, { label: 'X', onClick: back },    { label: 'Clear', onClick: clear }],
        [{ label: '7', onClick: onPress }, { label: '8', onClick: onPress }, { label: '9', onClick: onPress }, { label: '/', onClick: onPress }],
        [{ label: '4', onClick: onPress }, { label: '5', onClick: onPress }, { label: '6', onClick: onPress }, { label: '*', onClick: onPress }],
        [{ label: '1', onClick: onPress }, { label: '2', onClick: onPress }, { label: '3', onClick: onPress }, { label: '-', onClick: onPress }],
        [{ label: '0', onClick: onPress }, { label: '.', onClick: onPress }, { label: '=', onClick: submit },  { label: '+', onClick: onPress }]
    ]

    return (
        <div style={{ display: 'inline-block' }} >
            <div className='screen' >
                {input}
            </div>
            <div style={{ width: '400px' }}>
                {layout.map(row => (
                    <div style={{ flexDirection: 'row' }}>
                        {row.map(key => <Button {...key} />)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calculator