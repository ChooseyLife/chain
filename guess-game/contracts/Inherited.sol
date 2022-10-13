// pragma solidity ^0.8.0;
pragma solidity ^0.6.12;

contract father {
    string public eye = "big";
    uint256 height = 200;

    function test() public pure returns (string memory) {
        return "A";
    }
}

// contract mother {
//     // uint256 public height = 180;

//     function test() public returns (string memory) {
//         return "B";
//     }
// }

// contract MostDerived1 is
//     father,
//     mother //儿子继承父亲，母亲的属性
// {
//     function getHeight() public returns (uint256) {
//         //获取儿子身高的方法
//         return height;
//     }
// }
