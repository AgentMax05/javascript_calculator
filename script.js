let  displaytext = document.querySelector("#display_text")

function button_press(num) {
    //console.log(`pressed ${num}`)
    //console.log(`current string:_${displaytext.innerHTML}!`)
    if (num === "clear") {
        displaytext.innerHTML = ""
        return
    }
    else if (num === "=") {
        solve(displaytext.innerHTML)
        return
    }
    if (displaytext.innerHTML.length < 16) {
        if (num === "x") {
            displaytext.innerHTML = `${displaytext.innerHTML} × `
        }
        else if (num === "/") {
            displaytext.innerHTML = `${displaytext.innerHTML} ÷ `
        }
        else if (num === "-") {
            displaytext.innerHTML = `${displaytext.innerHTML} - `
        }
        else if (num === "+") {
            displaytext.innerHTML = `${displaytext.innerHTML} + `
        }
        else {
            displaytext.innerHTML = `${displaytext.innerHTML}${num}`
        }
    }
    else {
        console.log("current input is too long")
        document.querySelector("#display").style.border = "solid 5px rgb(196, 52, 52)"
        setTimeout(() => {
            document.querySelector("#display").style.border = "none"
        }, 1000)
    }
}

function solve(equation_string) {
    let equation1 = []
    for (let i of equation_string) {
        if (i != " ") {
            equation1.push(i)
        }
    }
    console.log("equation cleared of spaces: " + equation1)
    let current_string = ""
    let equation = []
    for (let i = 0; i < equation1.length; i++) {
        if (["×", "÷", "-", "+"].indexOf(equation1[i]) === -1) {
            current_string = `${current_string}${equation1[i]}`
        }
        else {
            if (current_string != "") {
                equation.push(current_string)
                current_string = ""
            }
            equation.push(equation1[i])
        }
        if (i === equation1.length - 1) {
            if (current_string != "") {
                equation.push(current_string)
                current_string = ""
            }
        }
    }
    console.log("equation with numbers joined: " + equation)
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === "-") {
            let previous = equation[i+1]
            equation.splice(i, 2)
            equation.splice(i, 0, `-${previous}`)
        }
    }
    console.log("equation with negatives joined: " + equation)

    //multiplying and dividing:
    let counter = 0
    let length = equation.length
    //alert(equation)
    for (let i = 0; i < length; i++) {
        i2 = i - counter
        //console.log(`value: ${equation[i2]}; i: ${i}; i2: ${i2}; next_value: ${equation[i2+1]}`)
        //console.log(`current equation is ${equation}`)
        if (equation[i2] === "×") {
            let num1 = parseInt(equation[i2-1])
            let num2 = parseInt(equation[i2+1])
            //console.log(`multiplying ${num1} and ${num2}`)
            for (let x = 0; x < 3; x++){
                //console.log(`removing ${equation[i2-1]}`)
                equation.splice(i2-1, 1)
            }
            equation.splice(i2-1, 0, num1 * num2)
            //alert(`current equation is: ${equation}`)
            counter = counter + 2
        }
        else if (equation[i2] === "÷") {
            let num1 = parseInt(equation[i2-1])
            let num2 = parseInt(equation[i2+1])
            //console.log(`dividing ${num1} and ${num2}`)
            for (let x = 0; x < 3; x++) {
                equation.splice(i2-1, 1)
            }
            equation.splice(i2-1, 0, Math.round(num1 / num2))
            counter = counter + 2
        }
    }
    console.log("equation after multiplication and division: " + equation)
    //adding:
    counter = 0
    let current_num = 0
    for (let i = 0; i < equation.length; i++) {
        i = i - counter
        // if (equation[i] === "+") {
        //     let num1 = parseInt(equation[i-1])
        //     let num2 = parseInt(equation[i+1])
        //     for (let x = 0; x < 3; x++) {
        //         equation.splice(i-1, 1)
        //     }
        //     equation.splice(i-1, 1, num1 + num2)
        //     counter = counter + 1
        // }
        if (equation[i] != "+") {
            current_num = current_num + parseInt(equation[i])
        }
    }
    console.log("final equation: " + current_num)
    displaytext.innerHTML = current_num.toString()
}