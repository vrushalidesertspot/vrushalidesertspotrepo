"use server"

import { Resend } from "resend"

export async function sendOrderConfirmation(orderData: any) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[SIMULATED EMAIL] Order confirmation for", orderData.email)
    return { success: true, simulated: true }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    let itemsHtml = orderData.items.map((item: any) => `
      <li>
        <strong>${item.name}</strong> x ${item.quantity}<br/>
        Flavor: ${item.selectedFlavor} | Weight: ${item.selectedWeight}kg<br/>
        Price: ₹${item.price * item.quantity}
      </li>
    `).join('')

    await resend.emails.send({
      from: "Vrushali Desert Spot <orders@resend.dev>", // Replace with your domain
      to: orderData.email,
      subject: `Order Confirmation - Vrushali Desert Spot`,
      html: `
        <h1>Thank you for your order, ${orderData.name}!</h1>
        <p>We've received your order and will contact you shortly via WhatsApp for confirmation.</p>
        <h2>Order Summary:</h2>
        <ul>${itemsHtml}</ul>
        <p><strong>Total Amount: ₹${orderData.total}</strong></p>
        <hr/>
        <p><strong>Delivery Details:</strong></p>
        <p>Address: ${orderData.address}</p>
        ${orderData.landmark ? `<p>Landmark: ${orderData.landmark}</p>` : ''}
        <p>Phone: ${orderData.phone}</p>
      `
    })

    return { success: true }
  } catch (error) {
    console.error("Email error:", error)
    return { error: "Failed to send confirmation email" }
  }
}
