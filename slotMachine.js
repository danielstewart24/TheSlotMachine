
var betsMade = 0
var initialFunds = 2000;
var walletAmount = initialFunds;
var winningsAmount = 0;

function displayWinner() {
    //If at least two numbers match in the TABLE, then
    // display this message
    let winnerMessage = document.querySelector(".winner-message")
    winnerMessage.innerHTML = "WINNER!"
    setTimeout(() => {winnerMessage.innerHTML = ""}, 1000)
}

function displayKeepGoing() {
   //If no numbers in the TABLE match, then
   // display this message
    let loserMessage = document.querySelector(".loser-message")
    loserMessage.innerHTML = "Keep Going!"
    setTimeout(
        () => {loserMessage.innerHTML = ""}, 1000
    )
}

function displayGameOverMessage() {
  //Display this message saying your money has been deposited
    let gameOverMessage = document.querySelector(".cash-out-message") 
    gameOverMessage.innerHTML = "$" + winningsAmount + " has been deposited! Thanks for playing Slot Machine!"
    setTimeout(() => {gameOverMessage.innerHTML = "" }, 3000)
}

function displayWalletAmount() {
    //Display initial wallet amount, and after every bet. Stop game and
    // reset when $ amount reaches 0
        document.getElementById("wallet").innerHTML = "Wallet: $" + walletAmount;
        if (walletAmount < 1) {stopGame()}
}

function displayWinnings() {
    // Upon loading, display the initial dollar amount the user will
    // begin with to bet with (this would be the cash they would upload from their 
    // bank account during signup, before playing)
    document.getElementById("winnings").innerHTML = "You've collected $" + winningsAmount   
}

function displayBetsMade() {
    // Beginning with 0, display a number increasing in the amount
    // of one for each handle pull
    document.getElementById("handlePullDisplay").innerHTML = "BETS: " + betsMade;
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
    //Game will begin here and randomize table while calling many
    //functions that will be updated on each push of the button
    var firstNum = Math.floor(Math.random() * 5);
    var secondNum = Math.floor(Math.random() * 5);
    var thirdNum = Math.floor(Math.random() * 5);
    var fourthNum = Math.floor(Math.random() * 5);  
    let numArray = [firstNum,secondNum,thirdNum,fourthNum]
    betsMade = betsMade + 1 
    displayPushResults(firstNum, secondNum,thirdNum,fourthNum)
    displayBetsMade()
    var betAmount = chooseDollarAmount()
    walletAmount = walletAmount - betAmount
    let currentWinnings = compareNums(numArray,betAmount)
    winningsAmount = winningsAmount + currentWinnings
    displayWalletAmount()
    displayWinnings()
}

function displayPushResults(firstNum, secondNum,thirdNum,fourthNum) { 
    document.getElementById("table-1").innerHTML = firstNum;
    document.getElementById("table-2").innerHTML = secondNum;
    document.getElementById("table-3").innerHTML = thirdNum;
    document.getElementById("table-4").innerHTML = fourthNum;
}
function resetBetsMadeDisplay() {
    //Display 0 for Bets made
   betsMade = 0
   displayBetsMade()
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
    displayGameOverMessage()
    displayPushResults(0, 0, 0, 0)
    resetBetsMadeDisplay()
    resetWalletAmountDisplay()
    resetWinningsDisplay()
}

function chooseDollarAmount() {
    var radioArrayAmounts = document.getElementsByName("money")
    for(i = 0; i < radioArrayAmounts.length; i++) {
        if(radioArrayAmounts[i].checked){
            return radioArrayAmounts[i].value
        }
    }
}

function stopGame() {
    cashOut()
}

function startGame() {
    // start game upon browser initiation    
    displayPushResults(0, 0, 0, 0)
    resetBetsMadeDisplay()
    resetWalletAmountDisplay()
    resetWinningsDisplay()
}

startGame()
// will call the startGame function upon page load
