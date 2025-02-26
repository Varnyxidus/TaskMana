import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client)

async function createInterpretation(data: {title: string; description: string, status: string}){
    try {
        const response = await database.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "67bce47b0007d1724238", ID.unique(), data);
        return response
    } catch (error) {
        console.error('Error creating interpretation', error);
        throw new Error('Failed to create interpretation');
    }
}


//fetch collection
async function fetchInterpretation(){
    try {
        const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "67bce47b0007d1724238", [Query.orderDesc("$createdAt")]);
        return response.documents
    } catch (error) {
        console.error('Error fetching interpretation', error);
        throw new Error('Failed to fetch interpretation');
    }
}

export async function POST(req: Request){
    try {
        const {title, description, status} = await req.json();
        const data = {title, description, status}
        const response = await createInterpretation(data);
        return NextResponse.json({message: "Interpretation created"})
    } catch (error) {
        return NextResponse.json({error: "Failed to create interpretation"}, {status:500})
    }
}

export async function GET(){
    try {
        const interpretations = await fetchInterpretation();
        return NextResponse.json({interpretations})
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch interpretation"}, {status:500})
    }
}