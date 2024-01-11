<script>
	let open = false;
	const toggle = () => {
		open = !open
	}
</script>

<div class="accordion">
		<div class="head">
				Title
				<button on:click={toggle}>Toggle</button>
		</div>
			{#if open}
				<div class="body">
					Body content
				</div>
			{/if}
</div>