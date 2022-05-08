var rows = [...document.querySelectorAll("tbody tr")],
	sorters = {
		coin: rs => rs.sort((a, b) => a.querySelector("[headers='coin']").textContent <
			b.querySelector("[headers='coin']").textContent ? -1 : 1
		)
		, change: rs => rs.sort((a, b) => parseFloat(a.querySelector("[headers='change']").textContent) -
			parseFloat(b.querySelector("[headers='change']").textContent)
		)
		, price: rs => rs.sort((a, b) => parseFloat(a.querySelector("[headers='price']").dataset.price) -
			parseFloat(b.querySelector("[headers='price']").dataset.price)
		)
	},
	listen = e => (sorters[e.target.id](rows)
		, requestAnimationFrame(setupTable)
	),
	ruler;

function setupTable() {
	var cell;
	rows.forEach((row, i) => (cell = row.querySelector("[data-price]")
		, cell.textContent = parseFloat(cell.dataset.price).toLocaleString("tr-TR", { minimumFractionDigits: 2 })
		, row.style.transform = `translateY(${ruler[i] - row.dataset.originalTop}px)`
	)
	);
}

document.getElementById("coin")
	.addEventListener("click", listen);
document.getElementById("change")
	.addEventListener("click", listen);
document.getElementById("price")
	.addEventListener("click", listen);

requestAnimationFrame(_ => (ruler = rows.map(row => row.dataset.originalTop = row.getBoundingClientRect().top)
	, setupTable()
));