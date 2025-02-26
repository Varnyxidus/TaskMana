import client from "@/lib/appwrite_client";
import { Databases, ID } from "appwrite";
import { NextResponse } from "next/server";

const database =  new Databases(client);

//fetch specific collection/interpretation
async function fetchInterpretation(id: string){
    try {
        const interpretation = await database.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "67bce47b0007d1724238", id);
        return interpretation
    } catch (error) {
        console.error('Error fetching interpretation', error);
        throw new Error("Failed to fetch interpretation");
    }
}


//delete specific collection/interpretation
async function deleteInterpretation(id: string){
    try {
        const response = await database.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "67bce47b0007d1724238", id);
        return response
    } catch (error) {
        console.error('Error deleting interpretation', error);
        throw new Error("Failed to delete interpretation");
    }
}

//update specific collection/interpretation
async function updateInterpretation(id: string, data: {title: string, description: string, status: string}){
    try {
        const response = await database.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "67bce47b0007d1724238", id, data);
        return response
    } catch (error) {
        console.error('Error deleting interpretation', error);
        throw new Error("Failed to delete interpretation");
    }
}

export async function GET(req: Request, {params}: {params: {id: string}}){
    try {
        const {id} = params;
        const interpretation = await fetchInterpretation(id);
        return NextResponse.json({interpretation})
    } catch (error) {
        return NextResponse.json({error: "Failed to get interpretation"}, {status: 500});
    }
}

export async function DELETE(req: Request, {params}: {params: {id: string}}){
    try {
        const id = params.id;
        await deleteInterpretation(id);
        return NextResponse.json({message: "Deleted interpretation"})
    } catch (error) {
        return NextResponse.json({error: "Failed to delete interpretation"}, {status: 500});
    }
}

export async function PUT(req: Request, {params}: {params: {id: string}}){
    try {
        const {id} = params;
        const interpretation = await req.json();
        await updateInterpretation(id, interpretation);
        return NextResponse.json({message: "Interpretation updated"})
    } catch (error) {
        return NextResponse.json({error: "Failed to update interpretation"}, {status: 500});
    }
}