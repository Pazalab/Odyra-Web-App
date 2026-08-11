import path from "path";
import PDFDocument from "pdfkit"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateTransactionPDF(data) {
      return new Promise((resolve, reject) => {
            try {
                  const doc = new PDFDocument({ margin: 50 });
                  const chunks = [];

                  doc.on("data", (chunk) => chunks.push(chunk));
                  doc.on("end", () => {
                       resolve(Buffer.concat(chunks))
                   });
                  doc.on("error", (err) => reject(err));

                  const staticFolder = path.resolve(__dirname, "../static");

                  const logoPath = path.join(staticFolder, "logo.png");
                  const regularFontPath = path.join(staticFolder, "KumbhSans.ttf")
                  //PDF Structure
                  const startY = 50;
                  const logoWidth = 150;
                  const logoHeight = 60;

                  //register the fonts
                  try {
                        doc.registerFont("CustomFont", regularFontPath);
                        doc.font("CustomFont")
                  } catch (error) {
                        console.warn("Font file missing at path");
                        doc.registerFont("CustomFont", "Helvetica");
                  }

                  //register logo
                  try {
                        doc.image(logoPath, 50, startY, {
                              width: logoWidth,
                              height: logoHeight,
                        })
                  } catch (error) {
                        console.warn("Logo file missing or unreadable", error);
                        doc.fontSize(16).font("CustomFont").text("Odyra Safaris", 50, startY)
                  }
                  
                  doc.font("CustomFont").fontSize(10).fillColor("#444444")
                              .text("ABN: 41 145 418 931", 450, startY+35)
                              .text("ODBS: 1011773", 450, startY+50);

                        const lineY = startY + logoHeight + 15;
                        doc.moveTo(50, lineY)
                              .lineTo(550, lineY)
                              .stroke("#e6cebc");

                        doc.y = lineY + 20;
                        doc.font("CustomFont").fontSize(18).fillColor("#333333")
                              .text("Thank you for riding with Odyra Safaris", 50, doc.y, { align: "center"});

                        doc.font("CustomFont").fontSize(11).fillColor("#555555").moveDown(0.4)
                              .text("We hope you enjoyed your ride with us. This document serves as the official confirmation of booking reservation with us.", { align: "left"});

                        doc.moveDown(2)

                        doc.font("CustomFont").fontSize(11).fillColor("#444444");
                        doc.text(`Receipt ID: ${data.charge_id || "N/A"}`);
                        doc.text(`Paid On: ${new Date(data.paidAt).toLocaleString()}`);
                        doc.moveDown(1.5)

                        // Itinerary Section
                        doc.fontSize(14).fillColor('#813020').font('CustomFont').text('Ride Details', { underline: true });
                        doc.fontSize(11).fillColor('#333333').font('CustomFont').moveDown(0.5);
                        doc.text(`Ride Category: ${data.rideType || 'Standard Safari'}`);
                        doc.text(`Pickup Point: ${data.pickup || 'Not Specified'}`);
                        doc.text(`Drop-off Point: ${data.dropoff || 'Not Specified'}`);
                        doc.text(`Ride Duration: ${data.duration || 'Not Specified'}`);
                        doc.moveDown(1.5);

                        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#CCCCCC');
                        doc.moveDown(1.5);

                        // Payment Grid Summary
                        doc.fontSize(14).fillColor('#813020').font('CustomFont').text('Payment Summary', { align: "left"});
                        doc.fontSize(12).fillColor('#333333').font('CustomFont').moveDown(0.5);

                        doc.text('Description', 50, doc.y, { continued: true });
                        doc.text('Amount', { align: 'right' });
                        doc.moveDown(0.5);
                        
                        doc.fontSize(11);
                        doc.text('Odyra Safaris Ride', 50, doc.y, { continued: true });
                        doc.text(`$${data.rideCost.toFixed(2)} AUD`, { align: 'right' });
                        doc.moveDown(1);

                        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#EAECEE');
                        doc.moveDown(1);

                        // Final Total Block
                        doc.fontSize(14).fillColor('#813020').font('CustomFont');
                        doc.text('Total Amount Paid:', 50, doc.y, { continued: true });
                        doc.text(`$${data.rideCost.toFixed(2)} AUD`, { align: 'right' });

                        doc.end();
            } catch (error) {
                     console.error("ERROR INSIDE PDF BLOCK:", error);
                     reject(error);
            }
      })
}