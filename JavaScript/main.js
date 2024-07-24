let submissions=0;

function sendEmail(user_name,user_email)
{
  // console.log(user_name);
  // console.log(user_email);
 
  var templateParams = {
    name: user_name,
    message: 'Welcome to DAPS PCs! Here, we will send you special offers or news on upcoming PC Builds!',
    email: user_email,
    subject: "Welcome to Daps PCs!",
  };

  emailjs.init({
    publicKey: 't8IWKSA2SmFflF2QK',
    // Do not allow headless browsers
    blockHeadless: true,
    blockList: {
      // Block the suspended emails
      list: ['foo@emailjs.com', 'bar@emailjs.com'],
      // The variable contains the email address
      watchVariable: 'userEmail',
    },
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 10000,
    },
  });

  submissions+=1; //add 1 to submissions

  emailjs.send('service_jbbg2qy', 'template_ex3q39m', templateParams).then(
      (response) => {
        window.alert("Submission Successful! Thankyou!");
        //console.log('SUCCESS!', response.status, response.text);
      },
      (error) => {
        window.alert("Please enter a valid Email!");
        //console.log('FAILED...', error);
      },
  );
}

function nameChecker(name)
{
  if (name.length<1)
  {
    return false;
  }
  return true;
}

function emailChecker(email)  //Written by dap
{
  //First Check
  if(email.length<5)
    return false
  
  //Second Check
  for (let i=0;i<email.length;i++){
    if(email[i]=='@')
      return true;
  }
  return false;
}

document.getElementById("submit_form").onclick=function(){
  //Check for submission amount to stop bots
  if (submissions>=3) {
    window.alert("Too many submissions!");
    return;
  }

  //Get Vars
  const user_name=document.getElementById("user_name").value;
  const user_email=document.getElementById("user_email").value;

  //Check for validility
  if(nameChecker(user_name)==false){
    window.alert("Please enter a Name!");
    return;
  }
  if(emailChecker(user_email)==false){
    window.alert("Please enter a valid Email!");
    return;
  }

  //send Email
  sendEmail(user_name,user_email);
    // Email.send({
    //     Host : "smtp.elasticemail.com",
    //     Username : "danielspresian@gmail.com",
    //     Password : "7F15B05581404993922A373234189D4F499C",
    //     To : 'danielspresian@gmail.com',
    //     From : "danielspresian@gmail.com",
    //     Subject : "This is the subject",
    //     Body : "And this is the body"
    // }).then(
    //   message => alert(message)
    // );
}
  