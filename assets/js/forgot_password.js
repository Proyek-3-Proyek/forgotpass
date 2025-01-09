document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  forgotPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Mencegah form melakukan submit default

    const email = document.getElementById("email").value;

    // Validasi Email
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: "Harap masukkan email Anda!",
      });
      return;
    }

    // Tampilkan loading
    let loading;
    Swal.fire({
      title: "Mengirim...",
      text: "Harap tunggu sementara kami memproses permintaan Anda.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        loading = Swal;
      },
    });

    try {
      // Kirim permintaan ke endpoint request-reset-password
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
      console.log("Forgot Password Response:", result); // Debugging

      // Tutup loading
      loading.close();

      if (response.ok) {
        // Simpan email ke localStorage
        localStorage.setItem("email", email);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Kode OTP telah dikirim ke email Anda.",
        }).then(() => {
          window.location.href = "/forgotpass/OTP"; // Redirect ke halaman OTP
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

      // Tutup loading
      loading.close();

      Swal.fire({
        icon: "error",
        title: "Kesalahan",
        text: "Terjadi kesalahan pada server.",
      });
    }
  });
});
