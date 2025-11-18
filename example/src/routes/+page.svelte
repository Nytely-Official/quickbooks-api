<script lang="ts">
    import { getEstimate, updateEstimateDate } from './api.remote';

    let id = $state(198);
    const estimate = $derived(await getEstimate(id));

    // svelte-ignore state_referenced_locally
    let estimateDate = $state(estimate.data?.TxnDate ?? '');
</script>

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
