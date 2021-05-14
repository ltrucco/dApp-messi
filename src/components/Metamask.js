export const connectWallet = async () => {
    if (window.ethereum) { //check if Metamask is installed
          try {
              const address = await window.ethereum.enable(); //connect Metamask
              const obj = {
                      connectedStatus: true,
                      hasMetamask: true,
                      status: "Connected",
                      address: address
                  }
                  return obj;
               
          } catch (error) {
              return {
                  connectedStatus: false,
                  hasMetamask: true,
                  status: "🦊 Connect to Metamask using the button on the top right."
              }
          }
          
    } else {
          return {
              connectedStatus: false,
              hasMetamask: false,
              status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
          }
        } 
  };


  export const disconnectWalletMetamask = async () => {
    if (window.ethereum) { //check if Metamask is installed
          try {
            // window.ethereum.on('disconnect', () => alert('error'));



              return true
               
          } catch (error) {
              return false
          }
          
    } 
  };