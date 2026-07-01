// Since node 18+ has native fetch, we can use it directly.
async function runTests() {
  console.log("Running backend endpoints test...");
  
  // Test Inquiry
  try {
    const res = await fetch("http://localhost:5000/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "tanishajain1804@gmail.com",
        serviceName: "Full-Stack Web Development",
        projectDetails: "This is a diagnostic test request to verify email sending."
      })
    });
    const data = await res.json();
    console.log("Inquiry Endpoint Response Status:", res.status);
    console.log("Inquiry Response Data:", data);
  } catch (err) {
    console.error("❌ Inquiry Endpoint Failed:", err.message);
  }

  // Test Booking
  try {
    const res = await fetch("http://localhost:5000/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "tanishajain1804@gmail.com",
        serviceName: "Consultation Call",
        date: "01/07/2026",
        timeSlot: "11:00 AM",
        bookingRef: "HTX-999999",
        notes: "This is a diagnostic test booking."
      })
    });
    const data = await res.json();
    console.log("Booking Endpoint Response Status:", res.status);
    console.log("Booking Response Data:", data);
  } catch (err) {
    console.error("❌ Booking Endpoint Failed:", err.message);
  }
}

runTests();
