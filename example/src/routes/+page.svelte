<script lang="ts">
    import { estimatePdf, getEstimate, updateEstimateDate } from './api.remote';

    let id = $state(198);
    const estimate = $derived(await getEstimate(id));
    
    const pdfResponse = $derived((await estimatePdf(id)));
    const pdfUrl = $derived.by(() => {
        if (!pdfResponse.data) return undefined;
        const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
    })

    // svelte-ignore state_referenced_locally
    let estimateDate = $state(estimate.data?.TxnDate ?? '');
</script>

{#if pdfUrl}
    <iframe src={pdfUrl} width="100%" height="600" title="Estimate PDF" style="border: none;"></iframe>
{:else}
    <pre>{JSON.stringify(pdfResponse.fault, null, 4)}</pre>
{/if}

<input type="number" bind:value={id} />
<input type="text" bind:value={estimateDate} />
<button onclick={async () => {
    if (!estimate.data) return;
    return await updateEstimateDate({
        Id: id.toString(),
        TxnDate: estimateDate,
        SyncToken: estimate.data.SyncToken,
        CustomerRef: estimate.data.CustomerRef,
    });
}}>Update Estimate</button>

<pre>{JSON.stringify(estimate, null, 4)}</pre>
