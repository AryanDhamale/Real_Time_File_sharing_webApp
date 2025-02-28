import "./Info.css";

function Info()
{
    return (
        <div className="col-lg-6 InfCon">
          <p className="name default">FILE UPLOADER</p>
          <p className="heading default">End-user file uploads <br/>made simple</p>
          <p className="sp default">This is an online platform where you can share your  files without any dependancy</p>
          <p className="rules default">Rules you must know</p>
          <ul>
            <li>Uploading-File-size less than or equal <b>10MB</b></li>
            <li>After Uploading has done ,the <b>OTP</b>'ll valid only for <b>60sec</b></li>
            <li>You can Download file only once</li>
            <li>Multiple-File sending not allowed</li>
            <li><b>From-Link</b> && <b>Google Drive</b> not available yet!</li>
          </ul>
           
        </div>
    );
}

export default Info;