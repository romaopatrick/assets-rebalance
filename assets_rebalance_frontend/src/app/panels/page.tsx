// app/panels/page.tsx

import { FinAssetBankAccount } from "@/lib/domain/fin-asset-bank-account";
import { FinAssetsPanel } from "@/lib/domain/fin-assets-panel";
import { Suspense } from "react";
import PanelCardSession from "./components/panel-card-session";
import * as panelService from '@/app/panels/actions'
import * as accountsService from '@/app/accounts/actions'

export default async function Page() {
    const accounts: FinAssetBankAccount[] = await accountsService.getAllBankAccounts()
    const panels: FinAssetsPanel[] = await panelService.getAllPanels()

    return <Suspense fallback={<p>Loading...</p>}>
        {panels.map((x) => (
            <PanelCardSession accounts={accounts} key={x.id} panel={x} />
        ))}
    </Suspense>
}
