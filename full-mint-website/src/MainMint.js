import { connectWalletHandler, contractInstance } from "./utils/connect";
import { Button, Input, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { ethers, BigNumber } from "ethers";

const MainMit = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAccount] = useState(1);
  const isConnect = Boolean(accounts)

  const handlerConnect = async () => {
    const account = await connectWalletHandler();
    setAccounts(account)
  }

  async function handleMint() {
    const instance = contractInstance();
    try {
      const response = await instance.mint(BigNumber.from(mintAmount), {
        value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
      });
      console.log("response", response);
    } catch (error) {
      
    }
  }

  const handlerDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAccount(mintAmount - 1);
  };

  const handlerIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAccount(mintAmount + 1);
  };

  return (
    <div>
      {
      isConnect 
      ? <div>
          <Flex justify="center" align="center">
            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={handlerDecrement}
            >
              -
            </Button>
            <Input
              readOnly
              fontFamily="inherit"
              width="100px"
              height="40px"
              textAlign="center"
              paddingLeft="19px"
              marginTop="10px"
              type="number"
              value={mintAmount}
            />
            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={handlerIncrement}
            >
              +
            </Button>
          </Flex>
          <Button
            backgroundColor="#D6517D"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            marginTop="10px"
            onClick={handleMint}
          >
            Mint Now
          </Button>
        </div>
      : <Button onClick={handlerConnect}>You must be connected to Mint.</Button>
      }
    </div>
  );
}

export default MainMit;