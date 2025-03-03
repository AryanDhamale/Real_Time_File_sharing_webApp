# Real-Time File Sharing Web Application

![Project Logo](https://ih1.redbubble.net/image.1884313984.3382/st,small,507x507-pad,600x600,f8f8f8.jpg) <!-- Replace with your logo or remove this line -->

Welcome to the **Real-Time File Sharing Web Application**, a fast, secure, and user-friendly platform for sharing files instantly. This application allows users to upload files from their device, Google Drive, camera, or via a link, and share them with others using a one-time password (OTP) valid for 60 seconds.

---

## Features

- **Multiple Upload Options**:
  - Upload files directly from your device.
  - Import files from Google Drive.
  - Capture and upload images/videos using your camera.
  - Upload files via a link.

- **Secure File Sharing**:
  - Generates a unique OTP for each file upload.
  - OTP is valid for **60 seconds** only, ensuring secure and time-bound sharing.

- **File Size Limit**:
  - Supports file uploads up to **10MB**.

- **Real-Time Sharing**:
  - Share files instantly with the receiver using the generated OTP.

- **Tech Stack**:
  - **Frontend**: React.js
  - **Backend**: Express.js
  - **File Handling**: Multer
  - **Database**: Firebase (for storing file metadata)

---

## How It Works

1. **Upload a File**:
   - Choose one of the four upload options: Device, Google Drive, Camera, or Link.
   - Select or capture the file you want to share.

2. **Generate OTP**:
   - Once the file is uploaded, the system generates a unique OTP valid for 60 seconds.

3. **Share the OTP**:
   - Share the OTP with the intended receiver.

4. **Receive the File**:
   - The receiver enters the OTP to access and download the file.

---

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- Firebase project setup for metadata storage.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AryanDhamale/Real_Time_File_sharing_webApp.git
   cd your-custome-directory-name

2. **Clone the Repository**:
   ```bash
    cd back_end
    npm install

    cd front_end
    npm install


3. **Configure Firebase**:
   - Add your Firebase configuration in the backend (e.g., firebaseConfig.js).  

  <br/>

4. **Run the Application**:
   ```bash 
   - Start the backend Server
    cd back_end
    npm run dev

   - Start the frontend Server
    cd front_end
    npm run dev


5. **Access the Application**:
    - Open your browser and navigate to http://localhost:5173

   <br/>

6.  **Tech Stack**
   - Frontend: React.js

   - Backend: Express.js

   - File Handling: Multer

   - Database: Firebase (for metadata storage)

   - Authentication: Firebase Authentication

   - Styling: CSS and Boostrap

  <br/>

  **Screenshots**

  ![Project Logo](https://res.cloudinary.com/dbsncdcuf/image/upload/v1740980432/Screenshot_2025-03-01_105918_r3r8bt.png)

 <br/>

  **Contact**
  For any questions or feedback, feel free to reach out:

  - Email: aryandhamale07@gmail.com

  - GitHub: Aryandhamale

  - Project Link: https://real-time-file-sharing-web-app.vercel.app/


**Happy Sharing! 🚀**