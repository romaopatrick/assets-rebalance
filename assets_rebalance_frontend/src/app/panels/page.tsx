// app/panels/page.tsx

import { FinAssetBankAccount } from "@/lib/domain/fin-asset-bank-account";
import { FinAssetsPanel } from "@/lib/domain/fin-assets-panel";
import { Suspense } from "react";
import PanelCardSession from "./components/panel-card-session";
import * as panelService from '@/app/panels/actions'
import * as accountsService from '@/app/accounts/actions'
import { CDIYearAverage, IPCAYearAverage } from "../indexer/actions";

export default async function Page() {
    const accounts: FinAssetBankAccount[] = await accountsService.getAllBankAccounts()
    const panels: FinAssetsPanel[] = await panelService.getAllPanels()

    const cdi = await CDIYearAverage()
    const ipca = await IPCAYearAverage()
    
    return <Suspense fallback={<p>Loading...</p>}>
        {panels.map((x) => (
            <PanelCardSession cdi={cdi??0} ipca={ipca??0} accounts={accounts} key={x.id} panel={x} />
        ))}
    </Suspense>
}
