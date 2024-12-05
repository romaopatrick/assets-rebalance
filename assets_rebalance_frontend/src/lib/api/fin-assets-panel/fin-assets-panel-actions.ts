'use server';

import { ChangeFinAssetsPanelInput } from "@/lib/boundaries/change-fin-assets-panel-input";
import { handleResponse } from "../common/response-handle";
import { FinAssetsPanel } from "@/lib/domain/fin-assets-panel";
import { revalidateTag } from "next/cache";

const tag = 'panels';
const basePath = process.env.API_URL + '/FinAssetsPanel';

export async function changePanel(input: ChangeFinAssetsPanelInput): Promise<FinAssetsPanel> {
    const response = await fetch(basePath, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });

    revalidateTag(tag);

    return handleResponse(response);
}

export async function getAllPanels(activeOnly = false): Promise<FinAssetsPanel[]> {
    const url = `${basePath}/all?activeOnly=${activeOnly}`;
    const response = await fetch(url, {
        method: "GET",
        next: {
            tags: [tag],
        },
    });

    return handleResponse(response);
}

export async function getPanelById(id: string): Promise<FinAssetsPanel> {
    const url = `${basePath}/${id}`;
    const response = await fetch(url, {
        method: "GET",
        next: {
            tags: [tag],
        },
    });

    return handleResponse(response);
}

export async function disablePanel(id: string): Promise<void> {
    const url = `${basePath}/d/${id}`;
    const response = await fetch(url, {
        method: "PATCH",
    });

    revalidateTag(tag);

    return handleResponse(response);
}

export async function enablePanel(id: string): Promise<void> {
    const url = `${basePath}/e/${id}`;
    const response = await fetch(url, {
        method: "PATCH",
    });

    revalidateTag(tag);

    return handleResponse(response);
}
