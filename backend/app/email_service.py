import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import current_app

class EmailService:
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.smtp_username = os.getenv('SMTP_USERNAME')
        self.smtp_password = os.getenv('SMTP_PASSWORD')
        self.from_email = os.getenv('FROM_EMAIL', 'noreply@mindwell.app')
        
    def send_verification_email(self, user_email, username, verification_token):
        """Send email verification email"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = 'Verify Your MindWell Account'
            msg['From'] = self.from_email
            msg['To'] = user_email
            
            # Create verification URL
            base_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
            verification_url = f"{base_url}/verify-email?token={verification_token}"
            
            # HTML content
            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Verify Your MindWell Account</title>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                    .content {{ background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }}
                    .button {{ display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
                    .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🌟 Welcome to MindWell!</h1>
                        <p>Your Mental Wellness Journey Starts Here</p>
                    </div>
                    <div class="content">
                        <h2>Hi {username},</h2>
                        <p>Thank you for creating your MindWell account! To complete your registration and start your mental wellness journey, please verify your email address.</p>
                        
                        <p>Click the button below to verify your account:</p>
                        
                        <div style="text-align: center;">
                            <a href="{verification_url}" class="button">Verify Email Address</a>
                        </div>
                        
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #3b82f6;">{verification_url}</p>
                        
                        <p><strong>Important:</strong> This verification link will expire in 24 hours for your security.</p>
                        
                        <p>If you didn't create a MindWell account, you can safely ignore this email.</p>
                        
                        <p>Best regards,<br>The MindWell Team</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 MindWell. All rights reserved.</p>
                        <p>This email was sent to {user_email}</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            # Plain text content
            text_content = f"""
            Welcome to MindWell!
            
            Hi {username},
            
            Thank you for creating your MindWell account! To complete your registration and start your mental wellness journey, please verify your email address.
            
            Click the link below to verify your account:
            {verification_url}
            
            This verification link will expire in 24 hours for your security.
            
            If you didn't create a MindWell account, you can safely ignore this email.
            
            Best regards,
            The MindWell Team
            
            © 2024 MindWell. All rights reserved.
            """
            
            # Attach parts
            msg.attach(MIMEText(text_content, 'plain'))
            msg.attach(MIMEText(html_content, 'html'))
            
            # Send email
            if self.smtp_username and self.smtp_password:
                with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.smtp_username, self.smtp_password)
                    server.send_message(msg)
                return True
            else:
                # For development, just print the email
                print(f"=== EMAIL VERIFICATION ===")
                print(f"To: {user_email}")
                print(f"Subject: Verify Your MindWell Account")
                print(f"Verification URL: {verification_url}")
                print(f"========================")
                return True
                
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
    
    def send_reset_password_email(self, user_email, username, reset_token):
        """Send password reset email"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = 'Reset Your MindWell Password'
            msg['From'] = self.from_email
            msg['To'] = user_email
            
            base_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
            reset_url = f"{base_url}/reset-password?token={reset_token}"
            
            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Reset Your MindWell Password</title>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                    .content {{ background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }}
                    .button {{ display: inline-block; background: #ef4444; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
                    .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔐 Password Reset Request</h1>
                        <p>MindWell Account Security</p>
                    </div>
                    <div class="content">
                        <h2>Hi {username},</h2>
                        <p>We received a request to reset your MindWell account password. Click the button below to create a new password:</p>
                        
                        <div style="text-align: center;">
                            <a href="{reset_url}" class="button">Reset Password</a>
                        </div>
                        
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #ef4444;">{reset_url}</p>
                        
                        <p><strong>Security Note:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.</p>
                        
                        <p>Best regards,<br>The MindWell Team</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 MindWell. All rights reserved.</p>
                        <p>This email was sent to {user_email}</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            text_content = f"""
            Password Reset Request
            
            Hi {username},
            
            We received a request to reset your MindWell account password. Click the link below to create a new password:
            
            {reset_url}
            
            This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
            
            Best regards,
            The MindWell Team
            
            © 2024 MindWell. All rights reserved.
            """
            
            msg.attach(MIMEText(text_content, 'plain'))
            msg.attach(MIMEText(html_content, 'html'))
            
            if self.smtp_username and self.smtp_password:
                with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.smtp_username, self.smtp_password)
                    server.send_message(msg)
                return True
            else:
                print(f"=== PASSWORD RESET EMAIL ===")
                print(f"To: {user_email}")
                print(f"Subject: Reset Your MindWell Password")
                print(f"Reset URL: {reset_url}")
                print(f"===========================")
                return True
                
        except Exception as e:
            print(f"Error sending reset email: {e}")
            return False
