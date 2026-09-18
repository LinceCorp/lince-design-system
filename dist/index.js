import { useCallback as e, useEffect as t, useRef as n, useState as r } from "react";
import { LogOut as i, Menu as a, Moon as o, MoreHorizontal as s, PanelLeftClose as c, PanelLeftOpen as l, Plus as u, Sun as d } from "lucide-react";
import { NavLink as f } from "react-router-dom";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/cn.ts
function g(...e) {
	return e.filter(Boolean).join(" ");
}
//#endregion
//#region src/nav.ts
var _ = 4;
function v(e, t) {
	return t ? e.items.filter(t) : [...e.items];
}
function y(e, t) {
	return v(e, t).filter((e) => e.bottom).slice(0, 4);
}
function b(e, t) {
	let n = v(e, t);
	return e.groups.map((e) => ({
		grupo: e,
		itens: n.filter((t) => t.group === e.id)
	})).filter((e) => e.itens.length > 0);
}
//#endregion
//#region src/Sidebar.tsx
function x(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : ((t[0][0] ?? "") + (t.length > 1 ? t[t.length - 1][0] ?? "" : "")).toUpperCase();
}
function S({ rotulo: e, colapsada: t }) {
	return /* @__PURE__ */ m("div", {
		className: "mt-3 mb-1 flex h-4 items-center px-3 first:mt-0",
		children: t ? /* @__PURE__ */ m("div", { className: "h-px w-full bg-line-subtle" }) : /* @__PURE__ */ m("span", {
			className: "text-micro font-semibold tracking-wide text-fg-subtle",
			children: e
		})
	});
}
function C({ nav: e, logo: t, marcaCompacta: n, perfil: r, tema: a, acoesRapidas: s, filtrarItem: _, colapsada: v = !1, fixada: y = !0, aoAlternarFixada: C, aoNavegar: w, aoEntrarComMouse: T, aoSairComMouse: E }) {
	let D = b(e, _), O = /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m("div", {
		className: "relative shrink-0",
		children: r.avatarUrl ? /* @__PURE__ */ m("img", {
			src: r.avatarUrl,
			alt: "",
			className: "h-10 w-10 rounded-full object-cover ring-2 ring-surface"
		}) : /* @__PURE__ */ m("span", {
			className: "grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-sm font-semibold text-white ring-2 ring-surface",
			children: x(r.nome)
		})
	}), !v && /* @__PURE__ */ h("div", {
		className: "min-w-0 leading-tight",
		children: [/* @__PURE__ */ m("div", {
			className: "truncate text-body font-semibold",
			children: r.nome
		}), r.email && /* @__PURE__ */ m("div", {
			className: "truncate text-micro text-fg-subtle",
			children: r.email
		})]
	})] });
	return /* @__PURE__ */ h("aside", {
		onMouseEnter: T,
		onMouseLeave: E,
		className: g("flex h-full flex-col border-r border-line-subtle bg-surface transition-[width] duration-[var(--dur)]", v ? "w-(--sidebar-w-collapsed)" : "w-(--sidebar-w)"),
		children: [
			/* @__PURE__ */ m("div", {
				className: "flex h-16 shrink-0 items-center border-b border-line-subtle px-3",
				children: v ? /* @__PURE__ */ m("span", {
					className: "mx-auto grid h-9 w-9 place-items-center rounded-md bg-brand-500 font-display text-title font-extrabold text-white",
					children: n
				}) : /* @__PURE__ */ h(p, { children: [t, C && /* @__PURE__ */ m("button", {
					type: "button",
					onClick: C,
					"aria-label": y ? "Desafixar menu" : "Fixar menu",
					title: y ? "Desafixar menu" : "Fixar menu",
					className: "ml-auto grid h-8 w-8 place-items-center rounded-control text-fg-muted transition hover:bg-input hover:text-fg",
					children: m(y ? c : l, { size: 16 })
				})] })
			}),
			r.para ? /* @__PURE__ */ m(f, {
				to: r.para,
				onClick: w,
				className: g("flex h-[72px] shrink-0 items-center gap-3 border-b border-line-subtle px-3 hover:bg-input", v && "justify-center"),
				children: O
			}) : /* @__PURE__ */ m("div", {
				className: g("flex h-[72px] shrink-0 items-center gap-3 border-b border-line-subtle px-3", v && "justify-center"),
				children: O
			}),
			/* @__PURE__ */ h("div", {
				className: "flex flex-1 flex-col gap-1 overflow-y-auto p-2",
				children: [D.map(({ grupo: e, itens: t }) => /* @__PURE__ */ h("nav", {
					"aria-label": e.label,
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ m(S, {
						rotulo: e.label,
						colapsada: v
					}), t.map((e) => {
						let t = e.icon;
						return /* @__PURE__ */ m(f, {
							to: e.to,
							end: e.end,
							onClick: w,
							className: ({ isActive: e }) => g("group flex items-center gap-3 rounded-button px-3 py-2.5 text-body font-medium transition-all", v && "justify-center px-0", e ? "bg-linear-to-r from-brand-500 to-brand-700 text-white shadow-(--shadow-2)" : "text-fg-muted hover:bg-input hover:text-fg"),
							children: ({ isActive: n }) => /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m(t, {
								size: 20,
								"aria-hidden": "true",
								className: g("shrink-0 transition-transform group-hover:scale-110", !n && "text-accent")
							}), /* @__PURE__ */ m("span", {
								className: v ? "sr-only" : "truncate",
								children: e.label
							})] })
						}, e.to);
					})]
				}, e.id)), s && s.length > 0 && /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m(S, {
					rotulo: "Ações rápidas",
					colapsada: v
				}), s.map((e) => {
					let t = e.icon;
					return /* @__PURE__ */ h("button", {
						type: "button",
						onClick: () => {
							w?.(), e.aoAcionar();
						},
						className: g("group flex items-center gap-3 rounded-button px-3 py-2.5 text-body font-medium text-fg-muted transition-all hover:bg-input hover:text-fg", v && "justify-center px-0"),
						children: [/* @__PURE__ */ h("span", {
							className: "relative shrink-0 transition-transform group-hover:scale-110",
							children: [/* @__PURE__ */ m(t, {
								size: 20,
								"aria-hidden": "true",
								className: "text-accent"
							}), /* @__PURE__ */ m("span", {
								className: "absolute -right-1 -bottom-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-brand-500 text-white ring-2 ring-surface",
								children: /* @__PURE__ */ m(u, {
									size: 9,
									"aria-hidden": "true"
								})
							})]
						}), /* @__PURE__ */ m("span", {
							className: v ? "sr-only" : "truncate",
							children: e.label
						})]
					}, e.id);
				})] })]
			}),
			/* @__PURE__ */ h("div", {
				className: g("flex items-center gap-1 border-t border-line-subtle p-2", v && "flex-col"),
				children: [a && /* @__PURE__ */ m("button", {
					type: "button",
					onClick: a.alternar,
					"aria-label": "Alternar tema",
					title: "Alternar tema",
					className: "grid h-10 flex-1 place-items-center rounded-control text-fg-muted transition hover:bg-input hover:text-fg",
					children: a.resolvido === "dark" ? /* @__PURE__ */ m(d, {
						size: 18,
						"aria-hidden": "true"
					}) : /* @__PURE__ */ m(o, {
						size: 18,
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ m("button", {
					type: "button",
					onClick: () => {
						w?.(), r.aoSair();
					},
					"aria-label": "Sair",
					title: "Sair",
					className: "grid h-10 flex-1 place-items-center rounded-control text-danger transition hover:bg-input",
					children: /* @__PURE__ */ m(i, {
						size: 18,
						"aria-hidden": "true"
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/Topbar.tsx
function w({ aoAbrirMenu: e, titulo: t, extra: n }) {
	return /* @__PURE__ */ h("header", {
		className: "flex h-16 shrink-0 items-center gap-3 border-b border-line-subtle bg-surface px-3 sm:px-4",
		children: [
			e && /* @__PURE__ */ m("button", {
				type: "button",
				onClick: e,
				"aria-label": "Abrir menu",
				className: "grid h-10 w-10 place-items-center rounded-control text-fg-muted transition hover:bg-input hover:text-fg md:hidden",
				children: /* @__PURE__ */ m(a, {
					size: 20,
					"aria-hidden": "true"
				})
			}),
			t && /* @__PURE__ */ m("h1", {
				className: "truncate font-display text-title font-semibold text-fg",
				children: t
			}),
			n && /* @__PURE__ */ m("div", {
				className: "ml-auto flex items-center gap-1 sm:gap-2",
				children: n
			})
		]
	});
}
//#endregion
//#region src/BottomNav.tsx
function T({ nav: e, filtrarItem: t, aoMais: n }) {
	let r = y(e, t);
	return /* @__PURE__ */ h("nav", {
		"aria-label": "Navegação rápida",
		className: "fixed inset-x-0 bottom-0 z-[var(--z-sticky)] flex border-t border-line-subtle bg-surface md:hidden",
		children: [r.map((e) => {
			let t = e.icon;
			return /* @__PURE__ */ h(f, {
				to: e.to,
				end: e.end,
				className: ({ isActive: e }) => g("flex flex-1 flex-col items-center gap-1 py-2 text-micro transition", e ? "text-accent" : "text-fg-subtle"),
				children: [/* @__PURE__ */ m(t, {
					size: 20,
					"aria-hidden": "true"
				}), /* @__PURE__ */ m("span", {
					className: "truncate px-1",
					children: e.label
				})]
			}, e.to);
		}), /* @__PURE__ */ h("button", {
			type: "button",
			onClick: n,
			className: "flex flex-1 flex-col items-center gap-1 py-2 text-micro text-fg-subtle transition hover:text-fg",
			children: [/* @__PURE__ */ m(s, {
				size: 20,
				"aria-hidden": "true"
			}), /* @__PURE__ */ m("span", { children: "Mais" })]
		})]
	});
}
//#endregion
//#region src/AppShell.tsx
function E({ nav: i, logo: a, marcaCompacta: o, perfil: s, tema: c, acoesRapidas: l, filtrarItem: u, fixada: d, aoAlternarFixada: f, titulo: p, topbarExtra: _, children: v }) {
	let [y, b] = r(!1), [x, S] = r(!1), E = n(null), D = n(null), O = e(() => {
		D.current = document.activeElement, b(!0);
	}, []), k = e(() => {
		b(!1), D.current?.focus();
	}, []);
	t(() => {
		if (!y) return;
		let e = (e) => {
			e.key === "Escape" && k();
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [y, k]);
	let A = d || x, j = () => {
		E.current && window.clearTimeout(E.current), S(!0);
	}, M = () => {
		E.current = window.setTimeout(() => S(!1), 80);
	}, N = {
		nav: i,
		logo: a,
		marcaCompacta: o,
		perfil: s,
		tema: c,
		acoesRapidas: l,
		filtrarItem: u
	};
	return /* @__PURE__ */ h("div", {
		className: "h-dvh overflow-hidden bg-canvas",
		children: [
			/* @__PURE__ */ m("a", {
				href: "#conteudo",
				className: "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[var(--z-skip)] focus:rounded-control focus:bg-elevated focus:px-4 focus:py-2 focus:text-body focus:font-medium focus:shadow-(--shadow-2)",
				children: "Pular para o conteúdo"
			}),
			/* @__PURE__ */ m("div", {
				className: "fixed top-0 left-0 z-[var(--z-sidebar)] hidden h-dvh md:block",
				children: /* @__PURE__ */ m(C, {
					...N,
					colapsada: !A,
					fixada: d,
					aoAlternarFixada: f,
					aoEntrarComMouse: j,
					aoSairComMouse: M
				})
			}),
			y && /* @__PURE__ */ h("div", {
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Navegação",
				className: "fixed inset-0 z-[var(--z-drawer)] md:hidden",
				children: [/* @__PURE__ */ m("div", {
					className: "absolute inset-0 bg-black/60",
					onClick: k
				}), /* @__PURE__ */ m("div", {
					className: "absolute top-0 left-0 h-full",
					children: /* @__PURE__ */ m(C, {
						...N,
						colapsada: !1,
						aoNavegar: k
					})
				})]
			}),
			/* @__PURE__ */ h("div", {
				className: g("flex h-dvh flex-col transition-[padding] duration-[var(--dur)]", d ? "md:pl-(--sidebar-w)" : "md:pl-(--sidebar-w-collapsed)"),
				children: [/* @__PURE__ */ m(w, {
					aoAbrirMenu: O,
					titulo: p,
					extra: _
				}), /* @__PURE__ */ m("main", {
					id: "conteudo",
					tabIndex: -1,
					className: "flex-1 overflow-y-auto p-4 pb-20 sm:p-6 md:pb-6",
					children: v
				})]
			}),
			/* @__PURE__ */ m(T, {
				nav: i,
				filtrarItem: u,
				aoMais: O
			})
		]
	});
}
//#endregion
//#region src/PageHeader.tsx
function D({ titulo: e, descricao: t, acoes: n, className: r }) {
	return /* @__PURE__ */ h("div", {
		className: g("mb-6 flex items-start justify-between gap-4", r),
		children: [/* @__PURE__ */ h("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ m("h1", {
				className: "font-display text-display font-semibold text-fg",
				children: e
			}), t && /* @__PURE__ */ m("p", {
				className: "mt-1 text-body text-fg-muted",
				children: t
			})]
		}), n && /* @__PURE__ */ m("div", {
			className: "flex shrink-0 items-center gap-2",
			children: n
		})]
	});
}
//#endregion
//#region src/Logotipo.tsx
var O = [
	"M0 0H14.98V38.45H37.4V51.18H0V0Z",
	"M55.75 10.23V51.18H41.58V10.23H55.75Z",
	"M175.24 40.8C170.13 40.58 167.37 38.79 165.95 36.18L191.31 27.1C190.36 20.64 187.46 8.50999 171.2 8.50999C162.7 8.50999 152.72 12.29 149.81 23.99C149.19 26.47 148.8 30.08 147.29 32.14C144.17 36.43 138.23 40.33 131.4 40.33C122.79 40.33 120.72 35.13 120.72 29.43C120.72 24.17 123.36 20.5 128.24 20.5C134.84 20.5 136.01 28.09 136.01 28.12L146.61 22.52C146.61 22.52 144.67 8.48999 127.36 8.48999C119.1 8.48999 105.17 13.1 105.17 30.16C105.17 45.2 115.67 51.97 129.54 51.97C143.4 51.97 150.05 44.08 151.62 41.89C155.57 49.08 163.64 52.42 173.37 52.42C181.87 52.42 190.63 48.71 194.53 45.14L189.45 35.34C187.32 38.61 180.65 41.01 175.24 40.78V40.8ZM179.46 23.29L163.6 28.88C162.9 24.54 163.58 20.54 167.57 18.69C174.28 15.57 178.15 20.68 179.46 23.29Z",
	"M89.26 9.94999C81.78 9.48999 77.39 12.7 74.83 15.55L73.6 10.21H60.62V51.17H74.98V30.33C74.98 29.07 75.01 21.98 81.85 21.98C89.54 21.98 89.45 30.35 89.45 38.9V51.17H103.35V35.12C103.35 17.73 97.85 10.48 89.27 9.94999H89.26Z"
];
function k({ className: e, decorativo: t = !1 }) {
	return /* @__PURE__ */ m("svg", {
		viewBox: "0 0 195 53",
		fill: "none",
		className: e,
		...t ? { "aria-hidden": !0 } : {
			role: "img",
			"aria-label": "Lince"
		},
		children: O.map((e) => /* @__PURE__ */ m("path", {
			d: e,
			fill: "currentColor"
		}, e))
	});
}
//#endregion
//#region src/RodapeLince.tsx
var A = "https://lincehub.com.br/";
function j({ className: e }) {
	return /* @__PURE__ */ h("div", {
		className: g("flex items-center justify-center gap-1.5 text-caption", e),
		children: [/* @__PURE__ */ m("span", { children: "Desenvolvido por" }), /* @__PURE__ */ m("a", {
			href: A,
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": "Lince — lincehub.com.br",
			className: "inline-flex opacity-90 transition-opacity hover:opacity-100",
			children: /* @__PURE__ */ m(k, {
				decorativo: !0,
				className: "h-3 w-auto"
			})
		})]
	});
}
//#endregion
export { E as AppShell, T as BottomNav, k as Logotipo, _ as MAX_BARRA_INFERIOR, D as PageHeader, j as RodapeLince, A as SITE_INSTITUCIONAL_URL, C as Sidebar, w as Topbar, g as cn, b as gruposComItens, y as itensDaBarraInferior, v as itensVisiveis };
