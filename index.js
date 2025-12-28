const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://happy-new-year-2026-by-shariful.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

// Create transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// mongodb client
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Function to send thank you email
async function sendThankYouEmail(userEmail, userName) {
  try {
    const mailOptions = {
      from: `"New Year Celebration" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "🎉 Thank You for Joining Our New Year Celebration!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    color: #333;
                    margin: 0 auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
                .container {
                    background: white;
                    border-radius: 20px;
                    padding: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    margin-top: 20px;
                }
                .header {
                    text-align: center;
                    background: linear-gradient(45deg, #FFD700, #FF6B6B, #4ECDC4);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 20px;
                .highlight {
                    background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
                    padding: 15px;
                    border-radius: 10px;
                    margin: 20px 0;
                    border-left: 5px solid #667eea;
                }
                .countdown {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    padding: 20px;
                    border-radius: 15px;
                    text-align: center;
                    margin: 25px 0;
                    font-size: 18px;
                    font-weight: bold;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 2px dashed #667eea;
                    color: #666;
                    font-size: 14px;
                }
                .signature {
                    font-style: italic;
                    color: #764ba2;
                    margin-top: 20px;
                }
                .confetti {
                    display: inline-block;
                    animation: bounce 2s infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            </style>
        </head>
        <body>
            <div class="container">
                
                <h1 class="header">Welcome to the Celebration! 🎆</h1>
                
                <p>Dear ${userName},</p>
                
                <p>Thank you for joining our New Year Countdown Celebration! We're absolutely thrilled to have you with us as we count down to an amazing new beginning. 🌟</p>
                
                <div class="highlight">
                    <p><strong>✨ What's Next?</strong></p>
                    <p>A warm, heartfelt New Year wish email will be automatically sent to you on:</p>
                    <div class="countdown">
                        🗓️ <strong>January 1st, 2026 at 12:00:01 AM</strong> 🎇
                    </div>
                    <p>Mark your calendar! This special message will be the first email you receive in the new year! 🥂</p>
                </div>
                
                <p><strong>🎯 While You Wait:</strong></p>
                <ul>
                    <li>✨ Reflect on your achievements this year</li>
                    <li>🌟 Set exciting goals for 2026</li>
                    <li>🎊 Share the celebration with friends and family</li>
                    <li>❤️ Spread joy and positivity around you</li>
                </ul>
                
                <p><strong>📅 Save the Date:</strong><br>
                Join us on our website as we count down together to the magical moment when the clock strikes midnight!</p>
                
                <p>Remember, every new year is a blank book with 365 pages. Make 2026 your best story yet! 📖✨</p>
                
                <div class="footer">
                    <p>With festive cheers and warm wishes,</p>
                    <p class="signature">The New Year Celebration Team 🎆</p>
                    <p><small>P.S. The countdown has begun! Get ready for an amazing year ahead! ⏳</small></p>
                    <p><small>This is an automated message. Please do not reply to this email.</small></p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
}

// Function to send New Year email
async function sendNewYearEmail(userEmail, userName) {
  try {
    const mailOptions = {
      from: `"New Year Celebration" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `🎆 HAPPY NEW YEAR ${new Date().getFullYear() + 1}! Wishing You Magic and Joy! ✨`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    color: #333;
                    margin: 0 auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                }
                .container {
                    background: white;
                    border-radius: 20px;
                    padding: 10px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    margin-top: 20px;
                    position: relative;
                    overflow: hidden;
                }
                .container::before {
                    content: "🎊✨🎇";
                    position: absolute;
                    top: 10px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    font-size: 40px;
                    opacity: 0.2;
                }
                .header {
                    text-align: center;
                    background: linear-gradient(45deg, #FF0000, #FF8C00, #FFFF00, #008000, #0000FF, #4B0082, #EE82EE);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    font-size: 36px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                .year {
                    font-size: 80px;
                    font-weight: bold;
                    text-align: center;
                    background: linear-gradient(45deg, #FFD700, #FF6B6B);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    margin: 20px 0;
                    text-shadow: 3px 3px 0px rgba(0,0,0,0.1);
                }
                .greeting {
                    font-size: 28px;
                    text-align: center;
                    color: #d63031;
                    margin: 25px 0;
                    font-weight: bold;
                }
                .message-box {
                    background: linear-gradient(120deg, #ffecd2 0%, #fcb69f 100%);
                    padding: 25px;
                    border-radius: 15px;
                    margin: 25px 0;
                    border: 3px dashed #e17055;
                    font-size: 18px;
                }

                .resolution-item {
                    background: linear-gradient(45deg, #74b9ff, #0984e3);
                    color: white;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                    transition: transform 0.3s;
                }
                .resolution-item:hover {
                    transform: translateY(-5px);
                }
                .quote {
                    font-style: italic;
                    text-align: center;
                    font-size: 20px;
                    color: #2d3436;
                    margin: 30px 0;
                    padding: 20px;
                    background: linear-gradient(45deg, #dfe6e9, #b2bec3);
                    border-radius: 10px;
                }
                @keyframes sparkle {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .wish-list {
                    background: linear-gradient(45deg, #00b894, #00cec9);
                    color: white;
                    padding: 20px;
                    border-radius: 15px;
                    margin: 25px 0;
                }
                .footer {
                    text-align: center;
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 3px double #fd79a8;
                    color: #636e72;
                }
                .confetti {
                    display: inline-block;
                    animation: float 3s infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0); }
                    33% { transform: translateY(-10px) rotate(10deg); }
                    66% { transform: translateY(-5px) rotate(-10deg); }
                }
            </style>
        </head>
        <body>
            <div class="container">
                
                <h1 class="header">Happy New Year!</h1>
                
                <div class="greeting">
                    Dear ${userName},<br>
                    Welcome to ${new Date().getFullYear() + 1}! 🎉
                </div>
                
                <div class="message-box">
                    <p>As the clock struck midnight and fireworks painted the sky, we wanted to be among the first to wish you an extraordinary new year! 🌟</p>
                    
                    <p>This moment marks more than just a date change—it's a beautiful beginning, a fresh canvas waiting for your masterpiece, and 365 new opportunities to create, love, grow, and shine! ✨</p>
                    
                    <p>May ${new Date().getFullYear() + 1} be filled with:</p>
                </div>
                
                <div class="wish-list">
                    <p>🌟 <strong>Boundless Joy</strong> that makes your heart smile every day</p>
                    <p>💫 <strong>Remarkable Success</strong> in all your endeavors</p>
                    <p>❤️ <strong>Abundant Love</strong> from those who matter most</p>
                    <p>🌿 <strong>Perfect Health</strong> to enjoy every moment</p>
                    <p>🎯 <strong>Achieved Dreams</strong> beyond your imagination</p>
                    <p>✨ <strong>Magical Moments</strong> that become cherished memories</p>
                </div>
                
                <div class="quote">
                    "Tomorrow is the first blank page of a 365-page book. Write a good one."<br>
                    <span style="color: #d63031;">- Brad Paisley</span>
                </div>
                
                <p><strong>🎊 Remember:</strong> Every sunrise of ${new Date().getFullYear() + 1} is a new opportunity. Every sunset is a chance to reflect on growth. Make each day count!</p>
                
                <p>Thank you for being part of our New Year celebration journey. We're excited to see what amazing things you'll accomplish this year! 🏆</p>
                
                <div class="footer">
                    <p>With heartfelt wishes for your brightest year yet,</p>
                    <p style="font-size: 24px; color: #e84393; margin-top: 15px;">
                        🎇 Shariful Islam Udoy 🎇
                    </p>
                    <p><small>May your ${new Date().getFullYear() + 1} be as vibrant as fireworks and as hopeful as the first dawn!</small></p>
                    <p><small>🎉 Cheers to new beginnings! 🥂</small></p>
                    <p><small>This email was sent to you as part of our New Year celebration.</small></p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error) {

    throw error;
  }
}

// Schedule New Year emails for January 1st, 2026
const scheduleNewYearEmails = async () => {
  try {
    // Schedule for January 1st, 2026 at 12:00:01 AM
    const newYearDate = new Date('2026-01-01T00:00:01');
    
    schedule.scheduleJob(newYearDate, async () => {

      
      try {
        const db = client.db("newyearDB");
        const usersCollection = db.collection("users");
        
        // Find all users who haven't received New Year wish yet
        const users = await usersCollection.find({ 
          isWished: { $ne: true } 
        }).toArray();
        
        console.log(`Found ${users.length} users to send New Year wishes`);
        
        // Send emails to all users
        for (const user of users) {
          try {
            await sendNewYearEmail(user.email, user.name);
            
            // Mark as wished
            await usersCollection.updateOne(
              { email: user.email },
              { $set: { isWished: true, wishedAt: new Date() } }
            );
            

            
            // Add delay between emails to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
            
          } catch (error) {
            console.error(`Failed to send email to ${user.email}:`, error);
          }
        }
        

      } catch (error) {

      }
    });
    
    console.log('📅 New Year emails scheduled for:', newYearDate);
  } catch (error) {
    console.error('Error scheduling New Year emails:', error);
  }
};

async function startServer() {
  try {
    await client.connect();
    console.log("MongoDB connected");

    const db = client.db("newyearDB");
    const usersCollection = db.collection("users");

    // Schedule New Year emails
    scheduleNewYearEmails();

    // root
    app.get("/", (req, res) => {
      res.send("🎆 New Year Celebration Server is Running! 🎇");
    });

    // Health check
    app.get("/health", (req, res) => {
      res.json({ 
        status: "healthy", 
        message: "Server is running",
        newYear: "Emails scheduled for 2026-01-01 00:00:01"
      });
    });

    // 🔥 SAVE / UPDATE USER AFTER GOOGLE LOGIN
    app.post("/users", async (req, res) => {
      try {
        const { name, email } = req.body;

        if (!email) {
          return res.status(400).send({ message: "Email is required" });
        }

        const filter = { email };
        const updateDoc = {
          $set: {
            name,
            email,
            loginAt: new Date(),
          },
          $setOnInsert: {
            isWished: false,
          },
        };

        const options = { upsert: true };
        const result = await usersCollection.updateOne(
          filter,
          updateDoc,
          options
        );

        // Send thank you email
        try {
          await sendThankYouEmail(email, name);
          console.log(`✅ Thank you email sent to: ${email}`);
        } catch (emailError) {
          console.error("Failed to send thank you email:", emailError);
          // Don't fail the request if email fails
        }

        res.send({ 
          success: true, 
          result,
          message: "Welcome to the celebration! Check your email for confirmation."
        });
      } catch (error) {
        console.error("User save error:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get all users (for admin purposes)
    app.get("/users", async (req, res) => {
      try {
        const users = await usersCollection.find({}).toArray();
        res.send({ success: true, users });
      } catch (error) {
        console.error("Get users error:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get user count
    app.get("/users/count", async (req, res) => {
      try {
        const count = await usersCollection.countDocuments();
        res.send({ success: true, count });
      } catch (error) {
        console.error("Get user count error:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    app.listen(port, () => {
      console.log(`🎆 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
}

startServer();