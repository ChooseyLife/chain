import { connectWalletHandler } from "./utils/connect";
import { Text, Button } from "@chakra-ui/react";
import './App.css';

function App() {
  const isConnect = connectWalletHandler();
  return (
    <div className="App">
      {
        isConnect 
        ? <Button
        backgroundColor="#D6517D"
        borderRadius="5px"
        boxShadow="0px 2px 2px 1px #0F0F0F"
        color="white"
        cursor="pointer"
        fontFamily="inherit"
        padding="15px"
        marginTop="10px"
      >
        Mint Now
      </Button>
      : <Text>You must be connected to Mint.</Text>
      }
    </div>
  );
}

export default App;
