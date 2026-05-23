<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Nebula | Modern Smooth Calculator</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none; /* prevent accidental text selection on buttons */
        }

        body {
            min-height: 100vh;
            background: linear-gradient(145deg, #1a2a3a 0%, #0f1a24 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Segoe UI', 'Poppins', system-ui, -apple-system, 'Inter', 'SF Pro Text', sans-serif;
            padding: 1.5rem;
        }

        /* Glassmorphic card container */
        .calculator-wrapper {
            background: rgba(18, 25, 35, 0.65);
            backdrop-filter: blur(12px);
            border-radius: 3rem;
            padding: 1.5rem;
            box-shadow: 0 25px 45px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .calculator {
            width: 100%;
            max-width: 400px;
            background: rgba(12, 20, 28, 0.8);
            border-radius: 2rem;
            padding: 1.5rem;
            backdrop-filter: blur(4px);
            box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.5);
            transition: all 0.2s ease;
        }

        /* display area */
        .display {
            background: #0e1a1f;
            border-radius: 2rem;
            padding: 1.2rem 1.8rem;
            margin-bottom: 2rem;
            text-align: right;
            word-wrap: break-word;
            word-break: break-word;
            box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(90, 150, 180, 0.3);
        }

        .previous-operand {
            font-size: 1.1rem;
            color: #9bb7d4;
            min-height: 1.8rem;
            letter-spacing: 0.5px;
            font-weight: 400;
            opacity: 0.85;
        }

        .current-operand {
            font-size: 2.9rem;
            font-weight: 600;
            color: #eef5ff;
            line-height: 1.2;
            overflow-x: auto;
            white-space: nowrap;
            scrollbar-width: thin;
        }

        /* buttons grid */
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.85rem;
        }

        button {
            background: rgba(30, 45, 58, 0.9);
            border: none;
            font-size: 1.5rem;
            font-weight: 500;
            padding: 1rem 0;
            border-radius: 1.8rem;
            color: #eef3fc;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            backdrop-filter: blur(5px);
            box-shadow: 0 6px 0 rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.2);
            font-family: inherit;
            letter-spacing: 0.5px;
        }

        button:active {
            transform: translateY(3px);
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
            transition: 0.05s linear;
        }

        /* Special button styles */
        .operator {
            background: rgba(255, 140, 50, 0.9);
            color: white;
            text-shadow: 0 1px 1px rgba(0,0,0,0.2);
            box-shadow: 0 6px 0 #9b3a0e;
        }

        .operator:active {
            transform: translateY(3px);
            box-shadow: 0 2px 0 #9b3a0e;
        }

        .equals {
            background: #2c9c6e;
            box-shadow: 0 6px 0 #1b5e42;
            color: white;
            font-weight: 700;
        }

        .clear {
            background: #c95a5f;
            box-shadow: 0 6px 0 #7e3539;
            color: white;
        }

        .delete {
            background: #4e6e7e;
            box-shadow: 0 6px 0 #2a404d;
            font-size: 1.3rem;
        }

        .special {
            background: #2b4f6c;
            box-shadow: 0 6px 0 #143240;
        }

        /* hover effect for desktops */
        @media (hover: hover) {
            button:hover {
                filter: brightness(1.08);
                transform: translateY(-1px);
                box-shadow: 0 7px 0 rgba(0, 0, 0, 0.2);
            }
            button:active {
                transform: translateY(3px);
            }
        }

        /* responsive: smaller screens */
        @media (max-width: 480px) {
            .calculator {
                padding: 1.2rem;
            }
            .buttons {
                gap: 0.7rem;
            }
            button {
                font-size: 1.3rem;
                padding: 0.9rem 0;
                border-radius: 1.5rem;
            }
            .current-operand {
                font-size: 2.3rem;
            }
            .previous-operand {
                font-size: 0.95rem;
            }
        }

        /* custom scroll for current operand if needed */
        .current-operand::-webkit-scrollbar {
            height: 3px;
            background: #2c3e44;
            border-radius: 10px;
        }
        .current-operand::-webkit-scrollbar-thumb {
            background: #5fa3c0;
            border-radius: 10px;
        }
    </style>
</head>
<body>
<div class="calculator-wrapper">
    <div class="calculator">
        <div class="display">
            <div class="previous-operand" id="previousOperand"></div>
            <div class="current-operand" id="currentOperand">0</div>
        </div>
        <div class="buttons">
            <!-- Row 1 -->
            <button class="clear special" data-action="clear">AC</button>
            <button class="delete special" data-action="delete">⌫</button>
            <button class="operator" data-op="%">%</button>
            <button class="operator" data-op="/">÷</button>
            <!-- Row 2 -->
            <button data-number="7">7</button>
            <button data-number="8">8</button>
            <button data-number="9">9</button>
            <button class="operator" data-op="*">×</button>
            <!-- Row 3 -->
            <button data-number="4">4</button>
            <button data-number="5">5</button>
            <button data-number="6">6</button>
            <button class="operator" data-op="-">−</button>
            <!-- Row 4 -->
            <button data-number="1">1</button>
            <button data-number="2">2</button>
            <button data-number="3">3</button>
            <button class="operator" data-op="+">+</button>
            <!-- Row 5 -->
            <button data-number="0" style="grid-column: span 2;">0</button>
            <button data-number=".">.</button>
            <button class="equals" data-action="equals">=</button>
        </div>
    </div>
</div>

<script>
    // ---- MODERN SMOOTH CALCULATOR LOGIC ----
    // State management with clean modular approach
    let currentOperand = '0';
    let previousOperand = '';
    let operation = null;      // stores operator (+, -, *, /, %)
    let waitingForNewOperand = false;
    let shouldResetScreen = false;

    // DOM elements
    const currentOperandElement = document.getElementById('currentOperand');
    const previousOperandElement = document.getElementById('previousOperand');

    // Helper: update display with smooth rounding & formatting
    function updateDisplay() {
        // format current operand to avoid too many decimals but keep precision
        let displayCurrent = currentOperand;
        if (typeof displayCurrent === 'number') displayCurrent = displayCurrent.toString();
        
        // if it's a number with long decimal, trim for readability, but preserve full value internally
        if (displayCurrent.includes('.') && displayCurrent.length > 14) {
            displayCurrent = parseFloat(displayCurrent).toFixed(8);
            // remove trailing zeros
            displayCurrent = displayCurrent.replace(/\.?0+$/, '');
            if (displayCurrent === '') displayCurrent = '0';
        }
        
        // handle scientific notation for huge/small numbers? just keep as string but limit length
        if (displayCurrent.length > 18 && !displayCurrent.includes('e')) {
            displayCurrent = parseFloat(displayCurrent).toExponential(10);
        }
        
        currentOperandElement.innerText = displayCurrent;
        
        if (operation !== null && previousOperand !== '') {
            let opSymbol = '';
            switch (operation) {
                case '+': opSymbol = '+'; break;
                case '-': opSymbol = '−'; break;
                case '*': opSymbol = '×'; break;
                case '/': opSymbol = '÷'; break;
                case '%': opSymbol = '%'; break;
                default: opSymbol = '';
            }
            previousOperandElement.innerText = `${previousOperand} ${opSymbol}`;
        } else {
            previousOperandElement.innerText = previousOperand;
        }
    }

    // append number or decimal
    function appendNumber(number) {
        if (waitingForNewOperand) {
            currentOperand = number;
            waitingForNewOperand = false;
            shouldResetScreen = false;
        } else {
            // prevent multiple leading zeros
            if (number === '.' && currentOperand.includes('.')) return;
            if (currentOperand === '0' && number !== '.') {
                currentOperand = number;
            } else {
                currentOperand += number;
            }
        }
        updateDisplay();
    }

    // delete last character
    function deleteLast() {
        if (waitingForNewOperand) return;
        if (currentOperand.length === 1 || (currentOperand === '0')) {
            currentOperand = '0';
        } else {
            currentOperand = currentOperand.slice(0, -1);
            if (currentOperand === '') currentOperand = '0';
        }
        updateDisplay();
    }

    // clear everything
    function clearAll() {
        currentOperand = '0';
        previousOperand = '';
        operation = null;
        waitingForNewOperand = false;
        shouldResetScreen = false;
        updateDisplay();
    }

    // perform calculation based on stored operation
    function computeResult() {
        if (operation === null || previousOperand === '' || waitingForNewOperand) return null;
        
        let prev = parseFloat(previousOperand);
        let current = parseFloat(currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return null;
        
        let result;
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) return 'error';
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return null;
        }
        
        // Round floating precision errors (like 0.1 + 0.2)
        if (typeof result === 'number' && !Number.isInteger(result)) {
            result = parseFloat(result.toFixed(10));
        }
        
        return result;
    }

    // handle equals
    function evaluate() {
        if (operation === null || previousOperand === '' || waitingForNewOperand) return;
        
        const result = computeResult();
        if (result === 'error') {
            currentOperand = 'Error';
            previousOperand = '';
            operation = null;
            waitingForNewOperand = true;
            updateDisplay();
            // reset after 1.2 seconds smooth feel
            setTimeout(() => {
                if (currentOperand === 'Error') {
                    clearAll();
                }
            }, 1300);
            return;
        }
        
        if (result !== null && !isNaN(result)) {
            currentOperand = result.toString();
            previousOperand = '';
            operation = null;
            waitingForNewOperand = true;
            updateDisplay();
        } else {
            // fallback: just clear weird state
            clearAll();
        }
    }

    // set operation
    function setOperator(op) {
        // Prevent setting operator when error is on screen
        if (currentOperand === 'Error') {
            clearAll();
        }
        
        // if there's a pending operation and we are not waiting for new operand -> compute previous result first
        if (operation !== null && !waitingForNewOperand && previousOperand !== '') {
            const result = computeResult();
            if (result !== null && result !== 'error') {
                currentOperand = result.toString();
                previousOperand = '';
                operation = null;
                updateDisplay();
            } else if (result === 'error') {
                clearAll();
                return;
            }
        }
        
        // if no currentOperand or invalid state then abort
        if (currentOperand === '' || currentOperand === 'Error') return;
        
        // set previous operand and operator
        if (previousOperand === '' || waitingForNewOperand) {
            previousOperand = currentOperand;
        } else {
            // if previous exists and no waiting flag, we just replace operator? but we already handled above.
            // for chaining: if we are setting new op after equals like state -> use current as previous
            if (!waitingForNewOperand) {
                previousOperand = currentOperand;
            }
        }
        
        operation = op;
        waitingForNewOperand = true;   // next number typed will replace currentOperand
        updateDisplay();
    }

    // handle percentage special: convert current to percent of previous or just %
    function handlePercentage() {
        if (currentOperand === '' || currentOperand === 'Error') return;
        
        let currentNum = parseFloat(currentOperand);
        if (isNaN(currentNum)) return;
        
        // if there's an active operation, treat as percentage of previous operand (modern approach)
        if (operation !== null && previousOperand !== '' && !waitingForNewOperand) {
            let prevNum = parseFloat(previousOperand);
            if (!isNaN(prevNum)) {
                let percentValue = (currentNum / 100) * prevNum;
                currentOperand = percentValue.toString();
                waitingForNewOperand = false;
                updateDisplay();
            } else {
                // fallback: just convert to percent
                currentOperand = (currentNum / 100).toString();
                updateDisplay();
            }
        } else {
            // no operation pending: treat as percent of itself or just 0.xx
            currentOperand = (currentNum / 100).toString();
            updateDisplay();
        }
        // we do not reset operation, let the user continue
    }

    // ---- ATTACH EVENT HANDLERS (smooth & modern) ----
    function setupEventListeners() {
        // Number buttons
        const numberBtns = document.querySelectorAll('[data-number]');
        numberBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const num = btn.getAttribute('data-number');
                if (currentOperand === 'Error') clearAll();
                appendNumber(num);
            });
        });
        
        // Operator buttons ( + - * / % )
        const operatorBtns = document.querySelectorAll('.operator');
        operatorBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (currentOperand === 'Error') {
                    clearAll();
                }
                const op = btn.getAttribute('data-op');
                if (op === '%') {
                    // handle percent as modern function
                    handlePercentage();
                } else {
                    setOperator(op);
                }
            });
        });
        
        // Equals button
        const equalsBtn = document.querySelector('[data-action="equals"]');
        if (equalsBtn) {
            equalsBtn.addEventListener('click', () => {
                if (currentOperand === 'Error') {
                    clearAll();
                    return;
                }
                evaluate();
            });
        }
        
        // Clear (AC)
        const clearBtn = document.querySelector('[data-action="clear"]');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                clearAll();
            });
        }
        
        // Delete (⌫)
        const deleteBtn = document.querySelector('[data-action="delete"]');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (currentOperand === 'Error') {
                    clearAll();
                    return;
                }
                deleteLast();
            });
        }
        
        // Keyboard support (extra modern touch)
        window.addEventListener('keydown', (e) => {
            const key = e.key;
            // numbers 0-9 or decimal point
            if (/[0-9]/.test(key)) {
                e.preventDefault();
                if (currentOperand === 'Error') clearAll();
                appendNumber(key);
            }
            else if (key === '.') {
                e.preventDefault();
                if (currentOperand === 'Error') clearAll();
                appendNumber('.');
            }
            else if (key === 'Backspace') {
                e.preventDefault();
                if (currentOperand === 'Error') clearAll();
                deleteLast();
            }
            else if (key === 'Delete') {
                e.preventDefault();
                clearAll();
            }
            else if (key === '+' || key === '-' || key === '*' || key === '/') {
                e.preventDefault();
                if (currentOperand === 'Error') clearAll();
                let mappedOp = key;
                if (key === '*') mappedOp = '*';
                if (key === '/') mappedOp = '/';
                setOperator(mappedOp);
            }
            else if (key === '%') {
                e.preventDefault();
                if (currentOperand === 'Error') clearAll();
                handlePercentage();
            }
            else if (key === 'Enter' || key === '=') {
                e.preventDefault();
                if (currentOperand === 'Error') clearAll();
                evaluate();
            }
            else if (key === 'Escape') {
                e.preventDefault();
                clearAll();
            }
        });
    }

    // initial display set
    function init() {
        updateDisplay();
        setupEventListeners();
    }
    
    init();
</script>
</body>
</html>
