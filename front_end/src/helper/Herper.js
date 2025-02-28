

function generateOtp(size)
{
  if(size==0) return 0;
  let OTP="";
  for(let i=0;i<size;i++)
    {
      let num=Math.floor(Math.random()*10);
      OTP+=num;
    }   
  return OTP;
}


function validateFileSize(file)
{
  const totalSize=file.size;
  const mb=  10*(2**20) //5242880; /// 5*2^20 
  if(!totalSize) return true;
  const result=totalSize/mb;
  if(result<=1) return false; 
  else return true;
}

export {generateOtp,validateFileSize}