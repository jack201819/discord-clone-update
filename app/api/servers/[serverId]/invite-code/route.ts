import { v4 as uuidv4 } from "uuid"
import { currantProfile } from "@/lib/currant-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request, 
    { params }: { params: {serverId: string}}
) {
    try {
        const profile = await currantProfile(); 

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!params.serverId) {
            return new NextResponse("Server ID Missing", {status: 400});
        }

        const servers = await db.server.update({
            where: {
                id: params.serverId, 
                profileId: profile.id,
            },
            data: {
                inviteCode: uuidv4(), 

            }
        })
        return NextResponse.json(servers);
    } catch (error) {
        console.log("[SERVER_ID]", error)
        return new NextResponse("Internal Error", { status: 500});
    }
}