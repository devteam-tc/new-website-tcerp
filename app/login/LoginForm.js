// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../redux/authSlice";
// import styles from "./LoginForm.module.css";

// const TEST_PHONE = "+1234567890";
// const TEST_OTP = "123456";

// const LoginForm = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   useEffect(() => {
//     if (isAuthenticated) {
//       router.replace("/admin"); // ✅ Replace to prevent going back to login
//     }
//   }, [isAuthenticated, router]);

//   const handleSendOtp = () => {
//     setError("");
//     setLoading(true);
//     if (phone.trim() === TEST_PHONE) {
//       setConfirmationResult(true);
//       alert("Test OTP sent successfully! Use 123456");
//     } else {
//       setError("Invalid test number. Use +1234567890");
//     }
//     setLoading(false);
//   };

//   const handleVerifyOtp = () => {
//     if (otp === TEST_OTP) {
//       alert("Login successful!");
//       dispatch(login());
//       sessionStorage.setItem("isAuthenticated", "true");
//       router.replace("/admin");
//     } else {
//       setError("Invalid OTP. Use 123456");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Login with OTP</h2>
//       {error && <p className={styles.error}>{error}</p>}
//       <div className={styles.formGroup}>
//         {!confirmationResult ? (
//           <>
//             <input
//               type="text"
//               className={styles.input}
//               placeholder="Enter test phone number: +1234567890"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//             <button className={styles.button} onClick={handleSendOtp} disabled={loading}>
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               className={styles.input}
//               placeholder="Enter test OTP: 123456"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button className={styles.button} onClick={handleVerifyOtp} disabled={loading}>
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";

const TEST_PHONE = "+1234567890";
const TEST_OTP = "123456";

const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSendOtp = () => {
    setError("");
    setLoading(true);
    if (phone.trim() === TEST_PHONE) {
      setConfirmationResult(true);
      alert("Test OTP sent successfully! Use 123456");
    } else {
      setError("Invalid test number. Use +1234567890");
    }
    setLoading(false);
  };

  const handleVerifyOtp = () => {
    if (otp === TEST_OTP) {
      alert("Login successful!");
      router.replace("/admin"); // ✅ Redirect after successful login
    } else {
      setError("Invalid OTP. Use 123456");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login with OTP</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.formGroup}>
        {!confirmationResult ? (
          <>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter test phone number: +1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className={styles.button} onClick={handleSendOtp} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter test OTP: 123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className={styles.button} onClick={handleVerifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;


