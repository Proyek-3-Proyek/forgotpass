document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  forgotPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    try {
      const response = await fetch(
        "https://backend-eight-phi-75.vercel.app/api/auth/request-reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("email", email); // Simpan email untuk halaman berikutnya
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "OTP telah dikirim ke email Anda.",
        }).then(() => {
          window.location.href = "/OTP.html"; // Redirect ke halaman OTP
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: result.message || "Terjadi kesalahan, coba lagi nanti.",
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
