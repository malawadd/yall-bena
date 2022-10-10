
  
<h1 align="center">
  <br>
  <a href="https://odd-sun-5298.on.fleek.co/"><img src="https://blogger.googleusercontent.com/img/a/AVvXsEjhFMDfDn6NFSSML-fWtwjDYQAx1KR_vlN7L-OgS3uyNB83ghGF_kzh8hbxcYYmyyG5jMedj6qbVd9tlzQ9Xm3gBAWDQLkhXxR1d2GE69kJQvjUeww7cyQcVZx0A3ItWD6M81RKeI7znxEyeB7sPL_5yEwqCmRJuHGN-lTQhj4aGuVz98BaO_efDRK3" width="300"></a>
  <br>
  Yella Bena
  <br>
</h1>

<h4 align="center"> a decentralized splitting protocol </h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2ocyM7fnzjFUGi9MJSjMh38a0mvSaernKIj8qvIuN4TmqknpJOtFxSTv4wfvJqQs5fRziuSGYBAJcK-NI4yDV2fGTcpeEXYWeRQoIhsGjBFl_PxdoNpG-gEI3kxHqkl6JJn-RHKDSWzgVniFmvGbi-q9BGE9ukms12A6TOJXtc7W-TrNAVG75-tbN/s1000/Untitled-1.png)

## Key Features

* Yella Bena is a social decentralized web3 expense splitting protocol.
* with Yell Bena you easily create expenses, share, pay for it...etc.




## How To Use
#### Web App
To clone and run this project , you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git https://github.com/malawadd/yall-bena.git

# Go into the repository
$ cd yall-bena

# Install dependencies
$ yarn install

# Run the app
$ yarn dev
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl) or use `node` from the command prompt.

#### Smart Contract 
the smart contract are developed using solidity and deplyed on the coinex smart chain .

```bash
# Go into the the smart contract directory 
$ cd yall-bena/smart-contract

# Install dependencies
$ yarn install

# compile the contract 
$ npx hardhat compile 

# deploy the contract 
$ npx hardhat run --network coinex scripts/deploy.js
```
> **Note**
> make sure to create an ,env with your desired walllet monemorics 



## Credits

Yella bena uses the following open source packages:


- [nextjs](https://reactjs.org/) Next.js gives you the best developer experience with all the features you need for production:

- [The Ethers Project](https://github.com/ethers-io/ethers.js)  A complete Ethereum wallet implementation and utilities in JavaScript (and TypeScript)
- [ wagmi](https://wagmi.sh/) wagmi is a collection of React Hooks containing everything you need to start working with Ethereum.
- [rainbowkit](https://www.rainbowkit.com/) The best way to connect a wallet
- [classnames](https://jedwatson.github.io/classnames/) A simple javascript utility for conditionally joining classNames together.
- [React Spinners](https://mhnpd.github.io/react-loader-spinner/) Cool spinners for ReactJS application.




## License

MIT

