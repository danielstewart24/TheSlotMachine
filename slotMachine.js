
var handlePulls = 0
var initialFunds = 2000;
var walletAmount = initialFunds;
var winningsAmount = 0;

function displayWinner () {
    //If at least two numbers match in the TABLE, then
    // display this message
    let winnerMessage = document.querySelector(".winner-message")
    winnerMessage.innerHTML = "WINNER!"
    setTimeout(() => {winnerMessage.innerHTML = ""}, 1000)
}

function displayKeepGoing () {
   //If no numbers in the TABLE match, then
   // display this message
    let loserMessage = document.querySelector(".loser-message")
    loserMessage.innerHTML = "Keep Going!"
    setTimeout(
        () => {loserMessage.innerHTML = ""}, 1000
    )
}

// function displayInitialWalletAmount () {
//     document.getElementById("wallet").innerHTML = initialFunds;
// }

function displayWalletAmount() {
        document.getElementById("wallet").innerHTML = "Wallet: $" + walletAmount;
        if (walletAmount < 1) {stopGame()}
}

function displayWinnings() {
    // Upon loading, display the initial dollar amount the user will
    // begin with to bet with (this would be the cash they would upload from their 
    // bank account during signup, before playing)
    document.getElementById("winnings").innerHTML = "You've collected $" + winningsAmount   
}

function displayHandlePulls() {
    // Beginning with 0, display a number increasing in the amount
    // of one for each handle pull
    document.getElementById("handlePullDisplay").innerHTML = "BETS: " + handlePulls;

}

function countOccurrences(arr, val){ 
    return arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
    //https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-70.php#:~:text=Write%20a%20JavaScript%20program%20to%20count%20the%20occurrences,value%20is%20encountered%20inside%20the%20array.%20Sample%20Solution%3A
}

function compareNums (numArray,betAmount) {
  let winnings = 0
    numArray.map(
    (num) => {
      if (countOccurrences(numArray, num) > 2) {
        winnings =  betAmount * num 
        if (winnings > 0){
            displayWinner()    
        }
      } 
    }
   )
   if (winnings === 0) {displayKeepGoing()}
   return winnings
}

function pullHandle() {
    var firstNum = Math.floor(Math.random() * 5);
    var secondNum = Math.floor(Math.random() * 5);
    var thirdNum = Math.floor(Math.random() * 5);
    var fourthNum = Math.floor(Math.random() * 5);  
    let numArray = [firstNum,secondNum,thirdNum,fourthNum]
    handlePulls = handlePulls + 1 
    displayHandlePullResults(firstNum, secondNum,thirdNum,fourthNum)
    displayHandlePulls()
    var betAmount = chooseDollarAmount()
    walletAmount = walletAmount - betAmount
    let currentWinnings = compareNums(numArray,betAmount)
    winningsAmount = winningsAmount + currentWinnings
    displayWalletAmount()
    displayWinnings()
    console.log(handlePulls)
}

function resetHandlePull() {
   handlePulls = 0
   displayHandlePulls()
}

function displayHandlePullResults(firstNum, secondNum,thirdNum,fourthNum) { 
    document.getElementById("table-1").innerHTML = firstNum;
    document.getElementById("table-2").innerHTML = secondNum;
    document.getElementById("table-3").innerHTML = thirdNum;
    document.getElementById("table-4").innerHTML = fourthNum;
    console.log(firstNum, secondNum, thirdNum, fourthNum)
}

function resetWinningsDisplay() {
    //Display winnings in div/window under the results table
    winningsAmount = 0
    displayWinnings()

}

function resetWalletAmountDisplay(){
    walletAmount = initialFunds
    displayWalletAmount()
}


function cashOut() {
    //Reset entire game and display an alert with user's winnings
    displayHandlePullResults(0, 0, 0, 0)
    resetHandlePull()
    resetWalletAmountDisplay()
    resetWinningsDisplay()
    alert("Money has been deposited! Thanks for playing!")
}


function chooseDollarAmount () {
    var radioArrayAmounts = document.getElementsByName("money")
    for(i = 0; i < radioArrayAmounts.length; i++) {
        if(radioArrayAmounts[i].checked){
            return radioArrayAmounts[i].value
        }
    }
    console.log()
}
function stopGame() {
    cashOut()
}

function startGame() {
    // start game upon browser initiation    
    displayHandlePullResults(0, 0, 0, 0)
    resetHandlePull()
    resetWalletAmountDisplay()
    resetWinningsDisplay()
}

startGame()

