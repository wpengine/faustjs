<script context="module">
    import { browser, dev } from '$app/env';

    export const hydrate = dev;
    
    export async function load ({ page, context: {client: {resolved, query}}}) {
      
		const post = await resolved(() => {
      const post = query.post({
        asPreview: false,
        id: page.path,
        idType: 'URI',
      })

      if(!post) {
        return null
      }

      return {
        title: post.title(),
        content: post.content(),
      }

    })

    if(!post) {
      return null
    }

		return {
			props: {
				data: post,
			},
      maxage: 5000,
		}
	}
</script>
<script>

export let data;

</script>
<style>
 
</style>
<svelte:head>
  <title>{data.title}</title>
</svelte:head>
<div>
  <article>
    <header>
      <h1>{data.title}</h1>
    </header>
    <div>{@html data.content}</div>
  <footer><h2>Post Template</h2></footer>

  </article>
  <section>
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </section>
</div>