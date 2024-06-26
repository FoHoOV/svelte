import { flushSync } from 'svelte';
import { test } from '../../test';

export default test({
	html: `
		<p>snippet: 0</p>
		<button>toggle</button>
		<button>increase count</button>
	`,

	test({ assert, target, logs }) {
		const [toggle, increment] = target.querySelectorAll('button');

		flushSync(() => {
			increment?.click();
		});

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>snippet: 1</p>
				<button>toggle</button>
				<button>increase count</button>
			`
		);
		assert.deepEqual(logs, []);

		flushSync(() => {
			toggle?.click();
		});

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>component: 1</p>
				<button>toggle</button>
				<button>increase count</button>
			`
		);
		assert.deepEqual(logs, [1]);

		flushSync(() => {
			increment?.click();
		});

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>component: 2</p>
				<button>toggle</button>
				<button>increase count</button>
			`
		);
		assert.deepEqual(logs, [1]);

		flushSync(() => {
			toggle?.click();
		});

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>snippet: 2</p>
				<button>toggle</button>
				<button>increase count</button>
			`
		);
		assert.deepEqual(logs, [1]);
	}
});
