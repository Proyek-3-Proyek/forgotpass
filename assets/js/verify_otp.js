document.addEventListener("DOMContentLoaded", () => {
  const verifyOtpForm = document.getElementById("verifyOtpForm");
  const email = localStorage.getItem("email"); // Ambil email dari localStorage

  if (!email) {
    Swal.fire({
      icon: "error",
      title: "Kesalahan",
      text: "Email tidak ditemukan. Silakan ulangi proses lupa password.",
    });
    window.location.href = "/index.html";
    return;
  }

  // Event Listener untuk Verifikasi OTP
  verifyOtpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const otpInputs = document.querySelectorAll(".otp-input");
    const otpCode = Array.from(otpInputs)
      .map((input) => input.value)
      .join("");

    if (otpCode.length !== 6) {
      Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: "Harap masukkan kode OTP dengan lengkap!",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://backend-eight-phi-75.vercel.app/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: otpCode }),
        }
      );

      const result = await response.json();
      console.log("Verify Response:", result); // Debugging

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "OTP berhasil diverifikasi.",
        }).then(() => {
          window.location.href = "/update_password.html"; // Redirect ke halaman update password
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: result.message || "Kode OTP tidak valid.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Kesalahan",
        text: "Terjadi kesalahan pada server.",
      });
    }
  });

  // Event Listener untuk Kirim Ulang OTP
  const resendOtpButton = document.getElementById("resendOtpButton");
  resendOtpButton.addEventListener("click", async () => {
    try {
      const resendResponse = await fetch(
        "https://backend-eight-phi-75.vercel.app/api/auth/request-reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const resendResult = await resendResponse.json();
      console.log("Resend OTP Response:", resendResult); // Debugging

      if (resendResponse.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "OTP berhasil dikirim ulang ke email Anda.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: resendResult.message || "Gagal mengirim ulang OTP.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Kesalahan",
        text: "Terjadi kesalahan pada server.",
      });
    }
  });
});
