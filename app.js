
//const { default: Web3 } = require('web3')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/5f745e5fbd714aabb35ef183767297bb')

var BlockNumb = web3.eth.getBlockNumber()
document.getElementById("displayBloN").innerHTML = BlockNumb




const initialize = () => {
    //We have selected our required html elements
    const connectButton = document.getElementById('connect');
    const addr = document.getElementById("addr");
    const displayBal = document.getElementById("displaybal");
  
    const logout = () => {
      // code for handling logout
    }
  
    const connectHandler = (ev) => {
      // we automatically try to populate address and balance if metamask is connected.
    }
  
    const accountsChangedHandler = (accounts) => {
      // code for handling metamask account swithing by user
    }
  
    const chainChangedHandler = (chainId) => {
      // code for handling network swithing by user. eg user may switch from ethereum to binance smart chain
    }
  
    const clearListeners = () => {
      // clears all ethereum listeners provided by metamask
    }
  
    const getBalance = async (account) => {
      // code to fetch user's balance for currently active address
    }
    
    const onClickConnect = async () => {
      // code for triggering connection to metamask and fetching all user accounts
    };
  
    const isMetaMaskInstalled = () => {
       //code to check if the MetaMask extension is installed
    };
  
    const metaMaskClientCheck = () => {
      // creating our web3 instance and setting up listeners for various metamask events if metamask is installed
    };
    metaMaskClientCheck();
  };
  
  // this ensure that intialize is called after our dom content has been loaded.
  window.addEventListener('DOMContentLoaded', initialize);



//MetaMask connection

const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

const metaMaskClientCheck = () => {
    //Now we check to see if MetaMask is installed
    if (!isMetaMaskInstalled()) {
      //The button is now disabled
      connectButton.disabled = true;
      alert("Metamask not installed");
    } else {

      // attach click handler
      connectButton.onclick = onClickConnect;

      //If it is installed we change our button text
      connectButton.disabled = false;

      // instantiate web3, here we are using window.ethereum injected by metamask as our provider.
      window.web3 = new Web3(window.ethereum);


      // listening to events
      ethereum.on('connect', connectHandler);
      ethereum.on('accountsChanged', accountsChangedHandler);
      ethereum.on('chainChanged', chainChangedHandler);
    }
};

const onClickConnect = async () => {
    try {

        if (connectButton.innerText == "Connect") {
          connectButton.disabled = true;

          // Will open the MetaMask UI
          await ethereum.request({ method: 'eth_requestAccounts' });
          connectButton.disabled = false;

          //fetch user accounts.
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          connectButton.innerText = "Disconnect";

          //We take the first address in the array of addresses and display it
          accountsChangedHandler(accounts);
        } else {
          logout();
        }
    } catch (error) {
        console.error(error);
    }
};

const accountsChangedHandler = (accounts) => {
    if (accounts.length) {
      addr.innerText = accounts[0];
      getBalance(accounts[0]);
    } else {
      logout();
    }
}

const getBalance = async (account) => {
    const bal = await web3.eth.getBalance(account);


    // alternative way without using web3
    // const balInHex = await ethereum.request({ method: 'eth_getBalance', params: [account] });
    // const bal = web3.utils.hexToNumberString(balInHex)
    displayBal.innerText = web3.utils.fromWei(bal, "ether");
    addr.style.display = "";
}

const chainChangedHandler = (chainId) => {
    clearListeners();
    window.location.reload();
}

const logout = () => {
    addr.innerText = "";
    displayBal.innerText = "";
    addr.style.display = "None";
    connectButton.innerText = "Connect";
}

const clearListeners = () => {
    ethereum.removeListener('connect', connectHandler);
    ethereum.removeListener('accountsChanged', accountsChangedHandler);
    ethereum.removeListener('chainChanged', chainChangedHandler);
}