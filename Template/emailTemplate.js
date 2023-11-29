const emailTemplate = (name, OTP)=>{
    return(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
        
                .container {
                    width: 50%;
                    margin: auto;
                    overflow: hidden;
                }
        
                header {
                    background: #ffffff;
                    padding: 20px 0;
                    color: #ffffff;
                    text-align: center;
                    border-bottom: 1px solid #eeeeee;
                }
        
                #main {
                    padding: 20px 0;
                }
        
                #main h1 {
                    color: #333;
                }
        
                #main p {
                    font-size: 18px;
                    line-height: 1.6em;
                    color: #666;
                }
        
                #main .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <header>
                    <h2>Email Verification</h2>
                </header>
        
                <div id="main">
                    <h1>Hello ${name},</h1>
                    <p>Thank you for signing up! To complete your registration, please use the following one-time verification code:</p>
        
                    <h2>${OTP}</h2>
        
                    <p>Copy and paste this code into the verification field on our website. This code will expire in [expiry time].</p>
        
                    <p>If you did not sign up for our service, please ignore this email.</p>
        
                    <p>Best regards,<br>Find Doctor</p>
                </div>
            </div>
        </body>
        </html>
        `
    )
    }
    
    module.exports = emailTemplate