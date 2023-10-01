import { v4 as uuidv4 } from "uuid"
import { currantProfile } from "@/lib/currant-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currantProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const server = await db.server.create({
            data: {
                profileId: profile.id, // Use profile.id instead of profile.Id
                name, 
                imageUrl, 
                inviteCode: uuidv4(),
                channels: {
                   create: [
                       { name: "general", profileId: profile.id }
                   ] 
                },
                members: {
                    create: [
                       { profileId: profile.id, role: MemberRole.ADMIN } 
                    ]
                }
            }
        });

        
      return NextResponse.json(server)      
    } catch (error) {
        console.error("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
