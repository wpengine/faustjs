<script>
	import Header from '../../components/Header.svelte';
	import "../../styles/globals.css";
  	const { children, data } = $props();

</script>

<Header data={data.layoutData} />
<main class='bg-stone-100 text-gray-800 pb-16 pt-8 min-h-screen'>
	{@render children()}
</main>