import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import Menu from "./Menu";
import MenuItem from "./MenuItemInterface";

describe("<Menu />", () => {
	test("outputs a menu list with nested children", async () => {
		const items = [
			{ title: "Home", href: "/" },
			{
				title: "About",
				href: "/about",
				children: [
					{
						title: "Careers",
						href: "/careers",
						children: [
							{ title: "Search", href: "/careers/search" },
						],
					},
				],
			},
		];

		const expected = `<nav data-testid="menu"><div class="wrap"><ul><li><a href="/">Home</a></li><li><a href="/about">About</a><ul class="submenu"><li><a href="/careers">Careers</a><ul class="submenu"><li><a href="/careers/search">Search</a></li></ul></li></ul></li></ul></div></nav>`;

		render(<Menu data-testid="menu" items={items} />);

		await waitFor(() => screen.getByTestId("menu"));

		expect(screen.getByTestId("menu")).toContainHTML(expected);
	});

	test("returns nothing if given an empty array", async () => {
		render(
			<div data-testid="wrapper">
				<Menu items={[]} />
			</div>
		);

		await waitFor(() => screen.getByTestId("wrapper"));

		expect(screen.getByTestId("wrapper")).toBeEmptyDOMElement();
	});

	test("omits submenus if the children property is empty", async () => {
		const items = [
			{
				title: "About",
				href: "/about",
				children: [],
			},
		];

		const expected =
			'<nav data-testid="menu"><div class="wrap"><ul><li><a href="/about">About</a></li></ul></div></nav>';

		render(<Menu data-testid="menu" items={items} />);

		await waitFor(() => screen.getByTestId("menu"));

		expect(screen.getByTestId("menu")).toContainHTML(expected);
	});

	test("accepts HTML attribute props", async () => {
		const items = [{ title: "Home", href: "/" }];

		render(
			<Menu
				data-testid="menu"
				aria-label="Main"
				className="menu"
				id="main-menu"
				items={items}
			/>
		);

		await waitFor(() => screen.getByTestId("menu"));

		expect(screen.getByTestId("menu")).toHaveAttribute("aria-label");
		expect(screen.getByTestId("menu")).toHaveAttribute("class");
		expect(screen.getByTestId("menu")).toHaveAttribute("id");
	});

	test("accepts an `anchor` prop to alter anchor tag markup", async () => {
		const items = [{ title: "Home", href: "/" }];

		const spanLink = (item: MenuItem): React.ReactNode => (
			<span>
				<a href={item.href}>{item.title}</a>
			</span>
		);

		render(<Menu data-testid="menu" anchor={spanLink} items={items} />);

		const expected =
			'<nav data-testid="menu"><div class="wrap"><ul><li><span><a href="/">Home</a></span></li></ul></div></nav>';

		await waitFor(() => screen.getByTestId("menu"));

		expect(screen.getByTestId("menu")).toContainHTML(expected);
	});
});
