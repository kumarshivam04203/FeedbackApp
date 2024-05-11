import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to updated user status to accept message",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message accepted by the user",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept message",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = user._id; // eslint-disable-line no-underscore-dangle, max-

  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        { success: false, message: "Failed to find user" },
        { status: 404 }
      );
    }
    return (
      Response.json({ success: true, message: "Found User ", user }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed the updated  user status to accept message");
    return (
      Response.json({
        success: false,
        message: "Error is getting message acceptance status",
        error,
      }),
      { status: 500 }
    );
  }
}
