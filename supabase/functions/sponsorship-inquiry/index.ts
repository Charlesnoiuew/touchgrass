import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { first_name, last_name, company, email, phone, partnership_interest } = await req.json();

    if (!first_name || !last_name || !email || !partnership_interest) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const htmlBody = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fff;">
  <h2 style="color: #111; margin-bottom: 4px;">New Sponsorship Inquiry</h2>
  <p style="color: #888; margin-top: 0; font-size: 14px;">Touch Grass Music Fest &mdash; ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
  <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
    <tr><td style="padding: 8px 0; color: #999; width: 120px; vertical-align: top;">Name</td><td style="padding: 8px 0; font-weight: 600;">${first_name} ${last_name}</td></tr>
    <tr><td style="padding: 8px 0; color: #999; vertical-align: top;">Company</td><td style="padding: 8px 0;">${company || "&mdash;"}</td></tr>
    <tr><td style="padding: 8px 0; color: #999; vertical-align: top;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #111;">${email}</a></td></tr>
    <tr><td style="padding: 8px 0; color: #999; vertical-align: top;">Phone</td><td style="padding: 8px 0;">${phone || "&mdash;"}</td></tr>
  </table>
  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
  <p style="color: #999; font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: .05em;">Partnership Interest</p>
  <p style="font-size: 15px; line-height: 1.7; color: #111; white-space: pre-wrap;">${partnership_interest}</p>
</div>
    `.trim();

    const textBody = `New Sponsorship Inquiry — Touch Grass Music Fest\n\nName: ${first_name} ${last_name}\nCompany: ${company || "—"}\nEmail: ${email}\nPhone: ${phone || "—"}\n\nPartnership Interest:\n${partnership_interest}`;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Touch Grass Music Fest <partnerships@touchgrassmusicfest.com>",
        to: ["partnerships@touchgrassmusicfest.com"],
        reply_to: email,
        subject: `Sponsorship Inquiry — ${first_name} ${last_name}${company ? ` (${company})` : ""}`,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      console.error("Resend error:", err);
      return new Response(JSON.stringify({ error: "Failed to send email", detail: err }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error", detail: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
