const axios = require('axios');

const verifyPayment = async (req, res) => {
    try {
      const { token, amount } = req.body;
      console.log({token,amount})
        
      const config = {
        headers: {
          "Authorization":'Key test_secret_key_91777f9e70884e718840332957d04751',
        },
      };
      const response = await axios.post(
        'https://khalti.com/api/v2/payment/verify/',
        {
          token:token,
          amount:amount,
        },
        config
      );
      
      //Successful verification
      
      res.status(200).json({ message: 'Payment verification successful' });
    } catch (error) {
      // Handle payment verification and capture error
      console.error(error);
      res.status(500).json({ message: 'Payment verification failed' });
    }
  }

module.exports= {verifyPayment};














































// const { response } = require("express");

// const Payment= async(req, res) => {
//     try{
//         const{ token, amount, key} = req.body;
//         const data= {token, amount, key}
//         let config={
//             headers: {'Authorization': 'Key test_secret_key_91777f9e70884e718840332957d04751'}
//         };
//         axios.post("https://khalti.com/api/v2/payment/verify/", {token:token, amount:amount}, config)
//         .then(response => {
//             return res.status(201).json(response.data);
//         })
//         .catch(error => {
//             console.log(error);
//         });
//     }catch(error){
        
//     }
// }

// module.exports = Payment;