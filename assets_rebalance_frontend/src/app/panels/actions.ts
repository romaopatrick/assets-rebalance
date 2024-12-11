'use server';

import { ChangeFinAssetsPanelInput } from "@/app/panels/types";
import { handleResponse } from "../../lib/api/common/response-handle";
import { FinAssetsPanel } from "@/lib/domain/fin-assets-panel";
import { revalidateTag } from "next/cache";
import authfetch from "@/lib/api/common/auth-fetch";

const tag = 'panels';
const basePath = process.env.API_URL + '/FinAssetsPanel';

export async function changePanel(input: ChangeFinAssetsPanelInput): Promise<FinAssetsPanel> {
    const response = await authfetch(basePath, {
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
    const response = await authfetch(url, {
        method: "GET",
        next: {
            tags: [tag],
        },
    });

    return handleResponse(response);
}

export async function getPanelById(id: string): Promise<FinAssetsPanel> {
    const url = `${basePath}/${id}`;
    const response = await authfetch(url, {
        method: "GET",
        next: {
            tags: [tag],
            revalidate: 60
        },
    });

    return handleResponse(response);
}

export async function disablePanel(id: string): Promise<void> {
    const url = `${basePath}/d/${id}`;
    const response = await authfetch(url, {
        method: "PATCH",
    });

    revalidateTag(tag);

    return handleResponse(response);
}

export async function enablePanel(id: string): Promise<void> {
    const url = `${basePath}/e/${id}`;
    const response = await authfetch(url, {
        method: "PATCH",
    });

    revalidateTag(tag);

    return handleResponse(response);
}
