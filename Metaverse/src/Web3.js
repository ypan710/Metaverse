import abi from "./abi/abi.json" assert { type: "json" };

// smart contract address (changes for every deployment): 0x78943609D8236Bf61BCf6b84adA0d701a6f91a35

const blockchain = new Promise((res, rej) => {
  // if metamask is not available, notify user that they need to use metamask
  if (typeof window.ethereum === "undefined") {
    rej("You should install Metamask!");
  }

  // start a web3 instance
  let web3 = new Web3(window.ethereum);

  // create a new contract instance with all its methods and events defined in json interface object
  let contract = new web3.eth.Contract(
    abi,
    "0x78943609D8236Bf61BCf6b84adA0d701a6f91a35"
  );

  // get metamask address
  web3.eth
    .requestAccounts()
    .then((accounts) => console.log("My account is: ", accounts[0]));

  // get current supply of NFT tokens available
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .totalSupply()
      .call({ from: accounts[0] })
      .then((supply) => {
        console.log("Current supply of NFT Tokens is: ", supply);
      });
  });

  // get max supply of NFT tokens available
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .maxSupply()
      .call({ from: accounts[0] })
      .then((maxsupply) => {
        console.log("Maximum supply of NFT Tokens is: ", maxsupply);
      });
  });

  // get your buildings created in the metaverse
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .getOwnerBuildings()
      .call({ from: accounts[0] })
      .then((buildings) => {
        console.log("Your buildings: ", buildings);
      });
  });

  // get all buildings created in the metaverse
  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .totalSupply()
      .call({ from: accounts[0] })
      .then((supply) => {
        contract.methods
          .getBuildings()
          .call({ from: accounts[0] })
          .then((data) => {
            res({ supply: supply, building: data });
          });
      });
  });
});

export default blockchain;
