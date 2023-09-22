<script lang="ts">
	export let icon: string;
	export let weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 = 400;
	export let fill = true;
	export let grade: -25 | 0 | 200 = 0;
	export let opticalSize = 24;
</script>

<span
	class="material-symbols-rounded"
	style="font-variation-settings: 'FILL' {fill ? 1 : 0}, 'wght' {weight}, 'GRAD' {grade}, 'opsz' {opticalSize}; font-size:{opticalSize}px"
	>{icon}</span
>
