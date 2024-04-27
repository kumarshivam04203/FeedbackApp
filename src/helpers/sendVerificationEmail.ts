import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponce } from "@/types/ApiResponce";


export async function sendVerificationEmail(
    email: string,
    username?: string,
    verifyCode?: string,
) : Promise<ApiResponce> {
    try {
        await resend.emails.send({
            from: 'shivamkumar02517@gmail.com',
            to: email,
            subject: "Mystry message | Verification code",
            react: VerificationEmail({username, otp: verifyCode}),
        })
        return {
            success: true,
            message: 'Successfully sent the verification email'
        }
    } catch (error) {
        console.error("Error sending verification email", error)
        return {
            success: false,
            message: 'Failed to send the verification email'
        }
    }
}
