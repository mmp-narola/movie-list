import { NextResponse } from "next/server";

export const GET = async (req, res) => {

    return NextResponse.json(`Active`, { status: 200, });

}